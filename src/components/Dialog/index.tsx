import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import Modal, { modalsContainer } from '../basic/Modal';
import { createSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from '../../reducers/uiReducer';


const SLIDE_ANIM_DURATION = 300;
const selector = createSelector(
  // @ts-ignore
  store => store.uiReducer.dialog,
  dialog => dialog
);
/**
 * Dialog component, connected to redux store, for basic user interactions
 * and to have single Modal element (and not call ReactDOM.createPortal every time)
 */
const Dialog = () => {
  const dispatch = useDispatch();
  const { isOpen, children } = useSelector(selector);
  const [render, setRender] = useState(children);
  const toggleModal = useCallback(nextState => !nextState && dispatch(closeDialog()), []);

  React.useEffect(() => {
    // Delay unmount of children when closing
    if (!isOpen)
      setTimeout(() => setRender(children), SLIDE_ANIM_DURATION);
    else
      setRender(children);
  }, [children]);
  return (
    <>
      {modalsContainer !== null && ReactDOM.createPortal(
        // @ts-ignore
        <Modal
          isOpen={isOpen}
          stateChanged={toggleModal}
        >
          {render}
        </Modal>
        , modalsContainer)}
    </>
  );
};


export default Dialog;