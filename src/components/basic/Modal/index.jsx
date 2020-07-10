import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { ModalInner, ModalWrapper } from './styles';

const Modal = props => {
  const wrapperRef = useRef();
  const {
    isOpen = false, stateChanged,
    slideDirection = 'toRight', fade = false,
    closeOnClickOutside = true, children,
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

  function wrapperClicked (e) {
    if (closeOnClickOutside && e.target === wrapperRef?.current)
      setIsOpen(false);
  }

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
        {children}
      </ModalInner>
    </ModalWrapper>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  // represents open/closed state, receives 1 parameter the new state (true for open false for closed)
  stateChanged: PropTypes.func,
  slideDirection: PropTypes.oneOf(['toRight', 'toLeft', 'toBottom', 'toTop']),
  fade: PropTypes.bool,
  closeOnClickOutside: PropTypes.bool,
};

export default Modal;
