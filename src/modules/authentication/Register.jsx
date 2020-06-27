import React, { useEffect, useState, useMemo } from 'react';
import { Input, Button } from 'components/basic';
import { throttle } from 'lodash';
import AuthAPI from 'api/AuthAPI';

function validateEmail (email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default () => {
  const validateUsername = useMemo(() => {
    throttle(async () => {
      const { data } = await AuthAPI.usernameAvailable(username);
    }, 300);
  }, []);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [usernameError, setUsernameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

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

  function attemptRegister () {
    AuthAPI.register(JSON.stringify({
      username,
      email,
      password,
      confirmPassword,
    }));
  }

  return (
    <>
      <div>Register</div>
      <Input
        onChange={e => setUsername(e.target.value)}
        label='Username'
        helperText='Between 3 and 20 characters'
        errorText={usernameError}
      />
      <Input
        onChange={e => setEmail(e.target.value)}
        label='Email'
        helperText='No more than 50 characters'
        errorText={emailError}
      />
      <Input
        onChange={e => setPassword(e.target.value)}
        label='Password'
        helperText='Minimum 8 characters'
        errorText={passwordError}
      />
      <Input
        onChange={e => setConfirmPassword(e.target.value)}
        label='Confirm Password'
        helperText='Repeat your password'
        errorText={confirmPasswordError}
      />
      <Button text='Register' onClick={attemptRegister}/>
    </>
  );
}

