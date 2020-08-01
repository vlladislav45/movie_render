import { ProfileButton, Loading } from 'components';
import { Button, Modal } from 'components/basic';
import LoginForm from 'modules/authentication/LoginForm';
import RegisterForm from 'modules/authentication/RegisterForm';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { finishRedirect } from 'reducers/auth';
import { AnonymousNav, LoggedInNav } from './styles';

const AuthNav = props => {
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

  function renderLoggedInNav () {
    return (
      <LoggedInNav {...props}>
        <ProfileButton
          rippleSize='s'
          rippleColor='secondary'
        />
      </LoggedInNav>
    );
  }

  function renderAnonymousNav () {
    return (
      <AnonymousNav {...props}>
        <Button
          // type='text'
          text='login'
          color='secondary'
          onClick={() => setLoginModalOpen(!loginModalOpen)}
        />
        <Button
          // type='text'
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
      </AnonymousNav>
    );
  }



  return (
    <div style={{ position: 'relative'}}>
      {isLoading && <Loading />}
      {isLoggedIn
        ? renderLoggedInNav()
        : renderAnonymousNav()
      }
    </div>
  );
};

export default AuthNav;
