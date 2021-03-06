export const CHANGE_WINDOW_DIMENSIONS = 'CHANGE_WINDOW_DIMENSIONS';
const TOGGLE_NAVIGATION_DRAWER = 'TOGGLE_NAVIGATION_DRAWER';
const CLOSE_DRAWER = 'CLOSE_DRAWER';
const ENQUEUE_SNACKBAR_NOTIFICATION = 'ENQUEUE_SNACKBAR_NOTIFICATION';
const DEQUEUE_SNACKBAR_NOTIFICATION = 'DEQUEUE_SNACKBAR_NOTIFICATION';
const PROMPT = 'PROMPT';
const TOGGLE_DIALOG = 'TOGGLE_DIALOG';

export const changeWindowDimensions = (width, height, device, isMobileOrTablet) => ({
  type: CHANGE_WINDOW_DIMENSIONS,
  payload: { width, height, device, isMobileOrTablet },
});

export const toggleNavigationDrawer = () => ({
  type: TOGGLE_NAVIGATION_DRAWER,
});

export const closeNavigationDrawer = () => ({
  type: CLOSE_DRAWER,
});

// noinspection JSClosureCompilerSyntax
/**
 *     'Message',
 { ['retry now']: retryConnection },
 {
  closeOnAction: ['retry now'],
  autoCloseAfter: RETRY_CONNECTION_TIMEOUT,
 },
 * @param message any jsx or text
 * @param actions object with key = action text and value function when click on action
 * @param options {@link components/basic/Snackbar} for available options
 */
export const enqueueSnackbarMessage = (message, actions, options) => ({
  type: ENQUEUE_SNACKBAR_NOTIFICATION,
  payload: { message, actions, options },
});

export const dequeueSnackbarMessage = () => ({
  type: DEQUEUE_SNACKBAR_NOTIFICATION,
});

export const openDialog = children => ({
  type: TOGGLE_DIALOG,
  payload: {
    children,
    isOpen: true,
  }
})

export const closeDialog = () => ({
  type: TOGGLE_DIALOG,
  payload: {
    children: null,
    isOpen: false,
  }
})

const initialState = {
  windowDimensions: {},
  drawerOpen: false,
  snackbarQueue: [],
  dialog: {
    isOpen: false,
    children: null,
  }
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_NAVIGATION_DRAWER:
      return {
        ...state,
        drawerOpen: !state.drawerOpen,
      };
    case CLOSE_DRAWER:
      return {
        ...state,
        drawerOpen: false,
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
    case PROMPT: return {
      ...state,
      prompt: {
        props: payload,
      }
    };
    case TOGGLE_DIALOG: return {
      ...state,
      dialog: {
        ...payload,
      }
    };
    default:
      return state;
  }
}
