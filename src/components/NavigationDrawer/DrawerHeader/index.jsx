import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { finishRedirect } from 'reducers/auth';
import { setBaseTheme, setDarkTheme } from 'reducers/themeReducer';
import { Modal, Switch } from 'components/basic';
import { Loading } from 'components';
import RegisterForm from 'modules/authentication/RegisterForm';
import LoginForm from 'modules/authentication/LoginForm';
import {
  DarkModeToggle,
  DrawerLogo,
  HeaderPrimaryText,
  HeaderSecondaryText,
  LoginButton,
  MoonIcon,
  ProfilePhoto,
  RegisterButton,
  StyledDrawerHeader
} from './styles';


const DrawerHeader = () => {
  const dispatch = useDispatch();
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  
  const {
    isLoggedIn,
    loggedInUser,
    redirectToLogin,
    isLoading,
    isDark,
    loginModal,
    registerModal,
  } = useSelector(({ auth, themeReducer: { themeColors } }) => ({
    isLoggedIn: auth.isLoggedIn,
    loggedInUser: auth.loggedInUser,
    redirectToLogin: auth.redirectToLogin,
    isLoading: auth.isLoading,
    isDark: themeColors.isDark,
    loginModal: auth.modalsOpen.login,
    registerModal: auth.modalsOpen.register,
  }));
  
  useEffect(() => {
    if (loginModal !== loginModalOpen) {
      setLoginModalOpen(loginModal);
    }
    if (registerModal !== registerModalOpen) {
      setRegisterModalOpen(registerModal);
    }
  }, [loginModal, registerModal])
  
  useEffect(() => {
    if (redirectToLogin) {
      setRegisterModalOpen(false);
      setLoginModalOpen(true);
      dispatch(finishRedirect());
    }
  }, [redirectToLogin]);
  
  function toggleTheme() {
    dispatch(isDark ? setBaseTheme() : setDarkTheme());
  }
  
  
  function renderAnonymousHeader() {
    return (
      <>
        {/*<HeaderPrimaryText>*/}
        {/*  You are not logged in*/}
        {/*</HeaderPrimaryText>*/}
        {/*<HeaderSecondaryText>*/}
        {/*  Register to unlock better features*/}
        {/*</HeaderSecondaryText>*/}
        <LoginButton
          type='text'
          text='login'
          color='secondary'
          onClick={() => setLoginModalOpen(!loginModalOpen)}
        />
        <RegisterButton
          type='text'
          text='register'
          color='secondary'
          onClickCapture={() => setRegisterModalOpen(!registerModalOpen)}
        />
        {ReactDOM.createPortal(
          <Modal isOpen={registerModalOpen}
                 stateChanged={newState => setRegisterModalOpen(newState)}>
            <RegisterForm/>
          </Modal>,
          document.getElementById('modal'))}
        {ReactDOM.createPortal(
          <Modal isOpen={loginModalOpen}
                 stateChanged={newState => setLoginModalOpen(newState)}
          >
            <LoginForm/>
          </Modal>,
          document.getElementById('modal'))}
      </>
    )
  }
  
  function renderAuthenticatedHeader() {
    return (
      <>
        <ProfilePhoto/>
        <HeaderPrimaryText>{loggedInUser.username}</HeaderPrimaryText>
        <HeaderSecondaryText>{loggedInUser.email}</HeaderSecondaryText>
      </>
    )
  }

  return (
    <StyledDrawerHeader>
      <Loading isLoading={isLoading} />
      {isLoggedIn ? renderAuthenticatedHeader() : renderAnonymousHeader()}
      <DrawerLogo
        textColor='onSurface' robotColor='onSurface' $isLoggedIn={isLoggedIn}
      />
      <DarkModeToggle>
        <MoonIcon
          $isDark={isDark}
        />
        <Switch color='secondary' onCheckedStateChange={toggleTheme}/>
      </DarkModeToggle>
    </StyledDrawerHeader>
  );
};

export default DrawerHeader;