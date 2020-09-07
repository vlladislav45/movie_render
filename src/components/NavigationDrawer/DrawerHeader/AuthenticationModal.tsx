import React, { useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'components/basic';
import { FormContainer } from './styles';
import LoginForm from 'modules/authentication/LoginForm';
import RegisterForm from 'modules/authentication/RegisterForm';

declare interface AuthenticationModalProps {
  loginModalOpen: boolean,
  registerModalOpen: boolean,
  stateChanged: (newState: boolean) => void
}

const AuthenticationModal = (props: AuthenticationModalProps) => {
  const { loginModalOpen, registerModalOpen, stateChanged } = props;
  const modalContainerRef = useRef<HTMLElement>(document.getElementById('modal'));
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  React.useLayoutEffect(() => {
    if (loginModalOpen || registerModalOpen) setIsModalOpen(true);
  });

  const modalContent = useMemo(() => <>
    <FormContainer
      // @ts-ignore
      $isVisible={loginModalOpen}
    >
      <LoginForm/>
    </FormContainer>
    <FormContainer
      // @ts-ignore
      $isVisible={registerModalOpen}
    >
      <RegisterForm/>
    </FormContainer>
  </>, [loginModalOpen, registerModalOpen]);

  return (
    <>
      {modalContainerRef.current &&
      ReactDOM.createPortal(
        //@ts-ignore
        <Modal
          isOpen={isModalOpen}
          stateChanged={stateChanged}
          withCloseBtn
          closeOnClickOutside={false}
        >
          {modalContent}
        </Modal>,
        modalContainerRef.current)
      }
    </>
  );
};

export default AuthenticationModal;