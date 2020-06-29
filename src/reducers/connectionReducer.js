const NETWORK_ERROR = 'NETWORK_ERROR';
const NETWORK_UP = 'NETWORK_UP';
const SERVER_ERROR = 'SERVER_ERROR';
const SERVER_UP = 'SERVER_UP';

export const networkDown = () => ({
  type: NETWORK_ERROR,
});

export const networkUp = () => ({
  type: NETWORK_UP,
});

export const serverDown = () => ({
  type: SERVER_ERROR,
});

export const serverUp = () => ({
  type: SERVER_UP,
});

const initialState = {
  serverOnline: true,
  networkOnline: true,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case NETWORK_ERROR:
      return {
        ...state,
        networkOnline: false,
      };
    case NETWORK_UP:
      return {
        ...state,
        networkOnline: true,
      };
    case SERVER_ERROR:
      return {
        ...state,
        serverOnline: false,
      };
    case SERVER_UP:
      return {
        ...state,
        serverOnline: true,
      };
    default:
      return state;
  }
}
