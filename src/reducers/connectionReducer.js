const INITIATED_REQUEST = 'INITIATED_REQUEST';
const FINISHED_REQUEST = 'FINISHED_REQUEST';
const NETWORK_ERROR = 'NETWORK_ERROR';
const NETWORK_UP = 'NETWORK_UP';
const SERVER_ERROR = 'SERVER_ERROR';
const SERVER_UP = 'SERVER_UP';
const INTERNET_ERROR = 'INTERNET_ERROR';
const INTERNET_UP = 'INTERNET_UP';

export const initiatedRequest = request => ({
  type: INITIATED_REQUEST,
  payload: request,
});

export const finishedRequest = request => ({
  type: FINISHED_REQUEST,
  payload: request,
});

export const networkDown = () => ({
  type: NETWORK_ERROR,
});

export const networkUp = () => ({
  type: NETWORK_UP,
});

export const internetDown = () => ({
  type: INTERNET_ERROR,
});

export const internetUp = () => ({
  type: INTERNET_UP,
});

export const serverDown = () => ({
  type: SERVER_ERROR,
});

export const serverUp = () => ({
  type: SERVER_UP,
});

const initialState = {
  requestsQueue: [],
  serverOnline: true,
  networkOnline: window.navigator.onLine,
  internetOnline: true,
  isOnline: window.navigator.onLine, // this will be true if all other variables are true
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case INITIATED_REQUEST: {
      const requestsQueue = state.requestsQueue;
      requestsQueue.push(payload);
      return {
        ...state,
        requestsQueue,
      };
    }
    case FINISHED_REQUEST: {
      const requestsQueue = state.requestsQueue.filter(req => req.url !== payload.url);
      return {
        ...state,
        requestsQueue,
      };
    }
    case NETWORK_ERROR:
      return {
        ...state,
        networkOnline: false,
        isOnline: false,
      };
    case NETWORK_UP:
      return {
        ...state,
        networkOnline: true,
        isOnline: true,
      };
    case INTERNET_ERROR:
      return {
        ...state,
        internetOnline: false,
        isOnline: false,
      };
    case INTERNET_UP:
      return {
        ...state,
        internetOnline: true,
        isOnline: true,
      };
    case SERVER_ERROR:
      return {
        ...state,
        serverOnline: false,
        isOnline: true,
      };
    case SERVER_UP:
      return {
        ...state,
        serverOnline: true,
        isOnline: true,
      };
    default:
      return state;
  }
}
