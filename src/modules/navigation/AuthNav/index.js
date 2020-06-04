import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { attemptLogin, logout } from 'reducers/auth';
import { ReactComponent as MenuIcon } from 'assets/icons/menu-24px.svg';

import './styles.css';
import { AuthButton, ProfileCircle } from 'components/basic';

const AuthNav = () => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector(({ auth }) => ({
    isLoggedIn: auth.isLoggedIn,
  }));

  const login = () => {
    // TODO: take credentials from input
    dispatch(attemptLogin('stefan', 'stefan123'));
  };

  const logOut = () => dispatch(logout());

  return isLoggedIn
    ? (
      <div className='logged-in'>
        <ProfileCircle />
        <MenuIcon style={{ color: 'red' }} title='dfasdasdas' />
      {/*  <AuthButton*/}
      {/*    title='logout'*/}
      {/*    onClick={logOut}*/}
      {/*  />*/}
      </div>
    )
    : (
      <div className='auth'>
        <AuthButton
          title='login'
          onClick={login}
        />
        <AuthButton
          title='register'
          onClick={login}
        />
      </div>
    );
};

export default AuthNav;
