import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { finishRedirect } from 'reducers/auth';
import { Modal } from 'components/basic';
import { Loading } from 'components';
import RegisterForm from 'modules/authentication/RegisterForm';
import LoginForm from 'modules/authentication/LoginForm';
import {
  HeaderPrimaryText, HeaderSecondaryText,
  LoginButton,
  NotLoggedInText,
  ProfilePhoto,
  RegisterButton,
  StyledDrawerHeader
} from './styles';


const DrawerHeader = () => {
  const dispatch = useDispatch();
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  
  const { isLoggedIn, redirectToLogin, isLoading } = useSelector(({ auth }) => ({
    isLoggedIn: auth.isLoggedIn,
    redirectToLogin: auth.redirectToLogin,
    isLoading: auth.isLoading,
  }));
  
  useEffect(() => {
    if (redirectToLogin) {
      setRegisterModalOpen(false);
      setLoginModalOpen(true);
      dispatch(finishRedirect());
    }
  }, [redirectToLogin]);
  
  function renderAnonymousHeader() {
    return (
      <>
        <HeaderPrimaryText>
          You are not logged in
        </HeaderPrimaryText>
        <HeaderSecondaryText>
          Register to unlock better features
        </HeaderSecondaryText>
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
        <HeaderPrimaryText>Stefan</HeaderPrimaryText>
        <HeaderSecondaryText>kopa4a</HeaderSecondaryText>
      </>
    )
  }
  
  return (
    <StyledDrawerHeader>
      {isLoading && <Loading/>}
      {isLoggedIn ? renderAuthenticatedHeader() : renderAnonymousHeader()}
    </StyledDrawerHeader>
  );
};

export default DrawerHeader;