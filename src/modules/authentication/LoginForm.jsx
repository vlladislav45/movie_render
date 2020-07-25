import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from 'components';
import { Input, Button } from 'components/basic';
import { attemptLogin } from 'reducers/auth';
import { ErrorMessage, FormTitle, LoginContainer, LoginForm } from './styles';

export default () => {
  const dispatch = useDispatch();
  const { isLoading, loginError } = useSelector(({ auth }) => ({
    isLoading: auth.isLoading,
    loginError: auth.loginError,
  }));

  //TODO: debounce checking for username availability
  // const handleChange = React.useCallback(debounce(e => {
  //   dispatch(updateFilter({ search: e.target.value }));
  // }, 200), []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  function login (e) {
    e.preventDefault();
    dispatch(attemptLogin(username, password));
  }

  const btnEnabled = (username && !usernameError) &&
    (password && !passwordError);
  return (
    <LoginForm>
      <LoginContainer>
        <Loading isLoading={isLoading} elevation={18}/>
      </LoginContainer>
      <FormTitle>Login</FormTitle>
      {loginError &&
      <ErrorMessage>
        {loginError}
      </ErrorMessage>
      }
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
        onClickCapture={login}
        disabled={!btnEnabled}
      />
    </LoginForm>
  );
}

