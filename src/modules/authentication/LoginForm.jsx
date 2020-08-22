import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from 'components';
import { Input, Button } from 'components/basic';
import { attemptLogin } from 'reducers/auth';
import { ErrorMessage, FormTitle, StyledLoginForm } from './styles';
import { getSelector } from './utils';

const selector = getSelector('loginError');
const LoginForm = React.memo(() => {
  const dispatch = useDispatch();
  const { isLoading, loginError } = useSelector(selector);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = useCallback(e => {
    e.preventDefault();
    dispatch(attemptLogin(username, password));
  }, [username, password])

  const btnEnabled = username && password;
  return (
    <StyledLoginForm>
      <Loading isLoading={isLoading} elevation={18}/>
      <FormTitle>Login</FormTitle>
      {loginError &&
      <ErrorMessage>
        {loginError}
      </ErrorMessage>
      }
      <Input
        onChange={e => setUsername(e.target.value)}
        label='Username'
      />
      <Input
        onChange={e => setPassword(e.target.value)}
        label='Password'
        type='password'
      />
      <Button
        text='Login'
        onClickCapture={login}
        disabled={!btnEnabled}
      />
    </StyledLoginForm>
  );
})

export default LoginForm;