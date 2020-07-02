import { func } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dequeueSnackbarMessage } from '../../../reducers/uiReducer';
import {
  ActionButton, ActionsContainer,
  SNACKBAR_FADE_IN_DURATION,
  SnackBarContainer,
  SnackBarInner, SnackBarMessage,
} from './styles';

/**
 * Material snackbar https://material.io/components/snackbars
 * Polls snackbarQueue from redux store every {@Link AUTO_CLOSE_TIMEOUT}ms
 * and displays the message with actions
 * Every queue item has
 *   text - the text to display or any valid jsx (this is the only required thing)
 *   actions - object with keys - name of the action and value - function to execute (optional)
 *   options - object with additional config
 *     available options: {
 *       closeOnAction: Array with the name of the actions that close the snackbar,
 *       autoCloseAfter: Number different time to auto close
 *     }
 *
 */
let timeout;
const AUTO_CLOSE_TIMEOUT = 4000;
const SnackBar = props => {
  const dispatch = useDispatch();
  const { snackbarQueue } = useSelector(({ uiReducer }) => ({
    snackbarQueue: uiReducer.snackbarQueue,
  }));

  const [showSnackbar, setShowSnackbar] = useState(false);
  const autoClose = snackbarQueue[0]?.options?.autoCloseAfter || AUTO_CLOSE_TIMEOUT;
  // When new message appears in the queue, flag snackbar as visible
  // and set timeout to auto close
  useEffect(() => {
    if (snackbarQueue[0]) {
      setShowSnackbar(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
          autoCloseSnackbar();
        },
        autoClose);
    }

  }, [snackbarQueue[0]]);

  // Issue command to hide snackbar
  // after the fadeOut animation dequeue the message so we can invoke useEffect again
  function autoCloseSnackbar () {
    setShowSnackbar(false);
    setTimeout(() => {
      dispatch(dequeueSnackbarMessage());
    }, SNACKBAR_FADE_IN_DURATION);
  }

  if (!snackbarQueue[0])
    return null;

  const { message, actions, options = {} } = snackbarQueue[0];
  const {
    closeOnAction = [],
  } = options;

  function renderActions () {
    return Object.keys(actions).map(key => {
      function actionClicked (e) {
        if (closeOnAction.includes(key))
          autoCloseSnackbar();
        if (actions[key] && typeof actions[key] === 'function')
          actions[key](e);
      }

      return (
        <ActionButton
          type='text'
          color='primary'
          key={key}
          onClick={actionClicked}
        >
          {key}
        </ActionButton>
      );
    });
  }

  return (
    <SnackBarContainer
      appear={showSnackbar}
    >
      <SnackBarInner>
        <SnackBarMessage>
          {message}
        </SnackBarMessage>
        <ActionsContainer>
          {actions &&
          renderActions()
          }
        </ActionsContainer>
      </SnackBarInner>
    </SnackBarContainer>
  );
};

export default SnackBar;
