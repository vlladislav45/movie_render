import React, { useEffect, useState } from 'react';
import { Input, Button } from 'components/basic';
import AuthAPI from 'api/AuthAPI';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../components';
import { attemptRegister } from '../../reducers/auth';
import {
  ErrorMessage,
  FormTitle,
  LoginContainer,
  LoginForm,
  RegisterForm,
} from './styles';

function validateEmail (email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [usernameError, setUsernameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  const { isLoading, registerError } = useSelector(({ auth }) => ({
    isLoading: auth.isLoading,
    registerError: auth.registerError,
  }));

  useEffect(() => {
    (async () => {
      if (!username) return;
      const { data: isTaken } = await AuthAPI.usernameAvailable(username);
      if (isTaken) setUsernameError('Username is already taken');
      else if (username.length < 3 || username.length > 20) {
        setUsernameError('Username must be between 3 and 20 symbols');
      } else
        setUsernameError(null);
    })();
  }, [username]);

  useEffect(() => {
    if (!email) return;
    if (!validateEmail(email)) {
      setEmailError('Invalid email');
    } else if (email.length > 50) {
      setEmailError('Email cannot exceed 50 symbols');
    } else
      setEmailError(null);
  }, [email]);

  useEffect(() => {
    if (!password) return;
    if (password !== confirmPassword) {
      setPasswordError('Passwords dont match');
      setConfirmPasswordError('Passwords dont match');
    } else if (password.length < 8) {
      setPasswordError('Password must be atleast 8 symbols');
    } else {
      setPasswordError(null);
      setConfirmPasswordError(null);
    }
  }, [password, confirmPassword]);

  function register (e) {
    e.preventDefault();
    dispatch(attemptRegister({
      username,
      email,
      password,
      confirmPassword,
    }));
  }

  const btnEnabled = (username && !usernameError) &&
    (email && !emailError) &&
    (password && !passwordError) &&
    (confirmPassword && !confirmPasswordError);
  return (
    <RegisterForm>
      <LoginContainer>
        <Loading isLoading={isLoading} elevation={18}/>
      </LoginContainer>
      <FormTitle>Register</FormTitle>
      {registerError &&
        <ErrorMessage>
          {registerError}
        </ErrorMessage>
      }
      <Input
        className='register-input'
        onChange={e => setUsername(e.target.value)}
        label='Username'
        helperText='Between 3 and 20 characters'
        errorText={usernameError}
      />
      <Input
        className='register-input'
        onChange={e => setEmail(e.target.value)}
        label='Email'
        helperText='No more than 50 characters'
        errorText={emailError}
      />
      <Input
        className='register-input'
        onChange={e => setPassword(e.target.value)}
        label='Password'
        helperText='Minimum 8 characters'
        errorText={passwordError}
      />
      <Input
        className='register-input'
        onChange={e => setConfirmPassword(e.target.value)}
        label='Confirm Password'
        helperText='Repeat your password'
        errorText={confirmPasswordError}
      />
      <Button
        text='Register'
        onClickCapture={register}
        disabled={!btnEnabled}
      />
    </RegisterForm>
  );
}

