import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { CloseButton, ModalInner, ModalWrapper } from './styles';

export const modalsContainer = document.getElementById('modal');
const Modal = props => {
  const wrapperRef = useRef();
  const {
    isOpen = false, stateChanged,
    slideDirection = 'toRight', fade = false,
    closeOnClickOutside = true, children,
    withCloseBtn,
  } = props;
  
  const [isModalOpen, setIsOpen] = useState(isOpen);
  
  useEffect(() => {
    if (isOpen !== isModalOpen) {
      setIsOpen(isOpen);
    }
  }, [isOpen]);
  
  useEffect(() => {
    if (stateChanged)
      stateChanged(isModalOpen);
  }, [isModalOpen]);
  
  const wrapperClicked = useCallback(e => {
    if (closeOnClickOutside && e.target === wrapperRef?.current)
      setIsOpen(() => false);
  
    e.stopPropagation();
  }, [])
  
  const closeModal = useCallback(() => setIsOpen(() => false), [])
  
  return (
    <ModalWrapper
      ref={wrapperRef}
      isOpen={isModalOpen}
      onClick={wrapperClicked}
    >
      <ModalInner
        isOpen={isModalOpen}
        fade={fade}
        direction={slideDirection}
      >
        {withCloseBtn && <CloseButton onClick={closeModal} />}
        {children}
      </ModalInner>
    </ModalWrapper>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  // represents open/closed state, receives 1 parameter the new state (true for open false for closed)
  stateChanged: PropTypes.func,
  slideDirection: PropTypes.oneOf(
    ['toRight', 'toLeft', 'toBottom', 'toTop', 'none']),
  fade: PropTypes.bool,
  closeOnClickOutside: PropTypes.bool,
  withCloseBtn: PropTypes.bool,
};

export default React.memo(Modal);
