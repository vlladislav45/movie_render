import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from 'components';
import { Input, Button } from 'components/basic';
import { attemptLogin } from 'reducers/auth';
import { ErrorMessage, FormTitle, LoginContainer, LoginForm } from './styles';

export default ({ onClose }) => {
  const dispatch = useDispatch();
  const { isLoading, loginError } = useSelector(({ auth }) => ({
    isLoading: auth.isLoading,
    loginError: auth.loginError,
  }));

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  useEffect(() => () => {
    console.log(' UN MOUNT ')
  },[]);

  function login (e) {
    e.preventDefault();
    dispatch(attemptLogin({
      username,
      password,
    }));
  }


  const btnEnabled = (username && !usernameError) &&
    (password && !passwordError);
  return (
    <LoginForm>
      <LoginContainer>
        <Loading isLoading={isLoading} elevation={18} />
      </LoginContainer>
      {loginError &&
        <ErrorMessage>
          {loginError}
        </ErrorMessage>
      }
      <FormTitle>Login</FormTitle>
      <Input
        onChange={e => setUsername(e.target.value)}
        label='Username'
        errorText={usernameError}
      />
      <Input
        onChange={e => setPassword(e.target.value)}
        label='Password'
        errorText={passwordError}
      />
      <Button
        text='Login'
        onClick={login}
        disabled={!btnEnabled}
      />
    </LoginForm>
  );
}

