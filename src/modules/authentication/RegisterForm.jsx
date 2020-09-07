import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { attemptRegister } from 'reducers/auth';
import AuthAPI from 'api/AuthAPI';
import { Button, Input } from 'components/basic';
import { Loading } from 'components';
import { ErrorMessage, FormTitle, StyledRegisterForm, } from './styles';
import { getSelector } from './utils';

function validateEmail (email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const selector = getSelector('registerError');

const RegisterForm = React.memo((callback, deps) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [usernameError, setUsernameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  const { isLoading, registerError } = useSelector(selector);
  
  const checkUsernameAvailability = useCallback(debounce(async e => {
    const username = e.target.value;
    setUsername(username);
    if (!username) return;
    const { data: { isUsernameExist } } = await AuthAPI.usernameAvailable(username);
  
    if (isUsernameExist === "true") {
      setUsernameError('Username is already taken');
    }
    else if (username.length < 3 || username.length > 20) {
      setUsernameError('Must be between 3 and 20 symbols');
    } else
      setUsernameError(null);
  }, 200), [])
  
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
      setPasswordError('Password must be at least 8 symbols');
    } else {
      setPasswordError(null);
      setConfirmPasswordError(null);
    }
  }, [password, confirmPassword]);

  const register = useCallback(e => {
    e.preventDefault();
    dispatch(attemptRegister({
      username,
      email,
      password,
      confirmPassword,
    }));
  }, [username, email, password, confirmPassword])

  const btnEnabled = (username && !usernameError) &&
    (email && !emailError) &&
    (password && !passwordError) &&
    (confirmPassword && !confirmPasswordError);
  return (
    <StyledRegisterForm>
      <Loading isLoading={isLoading} elevation={18}/>
      <FormTitle>Register</FormTitle>
      {registerError &&
        <ErrorMessage>
          {registerError}
        </ErrorMessage>
      }
      <Input
        className='register-input'
        onChange={checkUsernameAvailability}
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
        type='password'
        helperText='Minimum 8 characters'
        errorText={passwordError}
      />
      <Input
        className='register-input'
        onChange={e => setConfirmPassword(e.target.value)}
        label='Confirm Password'
        type='password'
        helperText='Repeat your password'
        errorText={confirmPasswordError}
      />
      <Button
        text='Register'
        onClick={register}
        disabled={!btnEnabled}
      />
    </StyledRegisterForm>
  );
});

export default RegisterForm;