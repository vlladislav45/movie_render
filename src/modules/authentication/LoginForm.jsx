import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from 'components';
import { Button, Input } from 'components/basic';
import { attemptLogin } from 'reducers/auth';
import { ErrorMessage, FormTitle, StyledLoginForm } from './styles';
import { getSelector } from './utils';

const selector = getSelector('loginError');
const LoginForm = React.memo(() => {
  const dispatch = useDispatch();
  const { isLoading, loginError } = useSelector(selector);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function login(e) {
    e.preventDefault();
    dispatch(attemptLogin(username, password));
  }

  const btnEnabled = React.useMemo(() => username && password, [username, password]);
  const usernameChanged = React.useCallback(e => setUsername(e.target.value), []);
  const passwordChanged = React.useCallback(e => setPassword(e.target.value), []);
  
  
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
        onChange={usernameChanged}
        label='Username'
      />
      <Input
        onChange={passwordChanged}
        label='Password'
        type='password'
      />
      <Button
        test
        text='Login'
        onClick={login}
        disabled={!btnEnabled}
      />
    </StyledLoginForm>
  );
})

export default LoginForm;