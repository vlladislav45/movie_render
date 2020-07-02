const TOGGLE_USER_DROP_DOWN = 'TOGGLE_USER_DROP_DOWN';
const CLOSE_DROP_DOWN = 'CLOSE_DROP_DOWN';
const CHANGE_WINDOW_DIMENSIONS = 'CHANGE_WINDOW_DIMENSIONS';
const ENQUEUE_SNACKBAR_NOTIFICATION = 'ENQUEUE_SNACKBAR_NOTIFICATION';
const DEQUEUE_SNACKBAR_NOTIFICATION = 'DEQUEUE_SNACKBAR_NOTIFICATION';

export const changeWindowDimensions = (width, height, device) => ({
  type: CHANGE_WINDOW_DIMENSIONS,
  payload: { width, height, device },
});

export const toggleUserDropDown = () => ({
  type: TOGGLE_USER_DROP_DOWN,
});

export const closeUserDropDown = () => ({
  type: CLOSE_DROP_DOWN,
});

export const enqueueSnackbarMessage = (message, actions, options) => ({
  type: ENQUEUE_SNACKBAR_NOTIFICATION,
  payload: { message, actions, options },
});

export const dequeueSnackbarMessage = () => ({
  type: DEQUEUE_SNACKBAR_NOTIFICATION,
});

const initialState = {
  windowDimensions: {},
  userDropDownOpen: false,
  snackbarQueue: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_USER_DROP_DOWN:
      return {
        ...state,
        userDropDownOpen: !state.userDropDownOpen,
      };
    case CLOSE_DROP_DOWN:
      return {
        ...state,
        userDropDownOpen: false,
      };
    case CHANGE_WINDOW_DIMENSIONS:
      return {
        ...state,
        windowDimensions: payload,
      };
    case ENQUEUE_SNACKBAR_NOTIFICATION: {
      let snackbarQueue = state.snackbarQueue;
      snackbarQueue.push(payload);
      return {
        ...state,
        snackbarQueue,
      };
    }
    case DEQUEUE_SNACKBAR_NOTIFICATION: {
      let newQueue = state.snackbarQueue;
      newQueue.shift();
      return {
        ...state,
        snackbarQueue: newQueue,
      };
    }
    default:
      return state;
  }
}
