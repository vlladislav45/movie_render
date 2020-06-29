import { ProfileButton } from 'components';
import { Modal, Button } from 'components/basic';
import RegisterForm from 'modules/authentication/RegisterForm';
import LoginForm from 'modules/authentication/LoginForm';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { attemptLogin } from 'reducers/auth';
import { LoggedInNav, AnonymousNav } from './styles';

const AuthNav = props => {
  const dispatch = useDispatch();
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const { isLoggedIn } = useSelector(({ auth }) => ({
    isLoggedIn: auth.isLoggedIn,
  }));



  function renderLoggedInNav () {
    return (
      <LoggedInNav {...props}>
        <ProfileButton/>
      </LoggedInNav>
    );
  }

  function renderAnonymousNav () {
    return (
      <AnonymousNav {...props}>
        <Button
          text='login'
          color='secondary'
          onClick={() => setLoginModalOpen(!loginModalOpen)}
          // onClick={login}
        />
        <Button
          text='register'
          color='secondary'
          onClick={() => setRegisterModalOpen(!registerModalOpen)}
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
    <>
      {isLoggedIn
        ? renderLoggedInNav()
        : renderAnonymousNav()
      }
    </>
  );
};

export default AuthNav;
