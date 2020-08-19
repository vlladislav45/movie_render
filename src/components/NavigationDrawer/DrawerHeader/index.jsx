import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { finishRedirect } from 'reducers/auth';
import { setBaseTheme, setDarkTheme } from 'reducers/themeReducer';
import { createSelector } from 'reselect';
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

const selector = createSelector(
  store => store.auth,
  store => store.themeReducer.themeColors,
  (auth, { isDark }) => ({
    isLoggedIn: auth.isLoggedIn,
    loggedInUser: auth.loggedInUser,
    redirectToLogin: auth.redirectToLogin,
    isLoading: auth.isLoading,
    loginModal: auth.modalsOpen.login,
    registerModal: auth.modalsOpen.register,
    isDark,
  })
)


const DrawerHeader = () => {
  const dispatch = useDispatch();
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  
  const {
    isLoggedIn, loggedInUser, redirectToLogin,
    isLoading, isDark, loginModal, registerModal,
  } = useSelector(selector);
  
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
  
  // If passed a new state update it, else just toggle
  const toggleLoginModal = useCallback( () => setLoginModalOpen(isOpen => !isOpen), [])
  const toggleRegisterModal = useCallback(() => setRegisterModalOpen(isOpen => !isOpen), [])
  const loginStateChange = useCallback(nextState => setLoginModalOpen(nextState), []);
  const registerStateChange = useCallback(nextState => setRegisterModalOpen(nextState), []);
  
  function renderAnonymousHeader() {
    return (
      <>
        <LoginButton
          type='text'
          text='login'
          color='secondary'
          onClickCapture={toggleLoginModal}
        />
        <RegisterButton
          type='text'
          text='register'
          color='secondary'
          onClickCapture={toggleRegisterModal}
        />
        {ReactDOM.createPortal(
          <Modal isOpen={registerModalOpen}
                 stateChanged={registerStateChange}>
            <RegisterForm/>
          </Modal>,
          document.getElementById('modal'))}
        {ReactDOM.createPortal(
          <Modal isOpen={loginModalOpen}
                 stateChanged={loginStateChange}
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
      <Loading isLoading={isLoading}/>
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

export default React.memo(DrawerHeader);