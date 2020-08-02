import AuthAPI from 'api/AuthAPI';
import { JWT_TOKEN } from 'config/authConstants';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const START_LOADING = 'START_LOADING';
const LOGIN_FAILED = 'LOGIN_FAILED';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAILED = 'REGISTER_FAILED';
const LOGOUT = 'LOGOUT';
const FINISH_REDIRECT = 'FINISH_REDIRECT';
const CHANGE_MODAL_STATE = 'CHANGE_MODAL_STATE';

export const checkToken = () => dispatch => {
  const jwt = localStorage.getItem(JWT_TOKEN);

  if (jwt) {
    dispatch({
      type: START_LOADING,
    });

    AuthAPI.checkToken(jwt).then(({ data }) => {
      if (data.user) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data.user,
        });
      }
    });
  }
};

export const attemptLogin = (username, password) => dispatch => {
  dispatch({
    type: START_LOADING,
  });

  AuthAPI.login({ username, password }).then(res => {
    const { data } = res;
    if (data.error)
      dispatch({
        type: LOGIN_FAILED,
        payload: data.error,
      });
    else {
      const { jwt } = data;
      localStorage.setItem(JWT_TOKEN, jwt);
      AuthAPI.checkToken(jwt).then(({ data }) => {
        if (data.user) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user,
          });
        }
      });
    }
  }).catch(err => {
    console.log(err);
    dispatch({
      type: LOGIN_FAILED,
      payload: err.toString(),
    });
    //TODO: Probably i may not get any error needs test
    console.log(' Login error ' + err);
  });
};

export const attemptRegister = credentials => dispatch => {
  dispatch({
    type: START_LOADING,
  });

  AuthAPI.register(credentials).then(res => {
    const { data } = res;
    if (data.error)
      dispatch({
        type: REGISTER_FAILED,
      });
    else
      dispatch({
        type: REGISTER_SUCCESS,
      });
  }).catch(err => console.log('Register error: ' + err));
};

export const logout = () => dispatch => {
  localStorage.removeItem(JWT_TOKEN);
  dispatch({
    type: LOGOUT,
  })
};

export const finishRedirect = () => ({
  type: FINISH_REDIRECT,
});

/**
 * Modal state should be with shape
 * login: isOpen :bool,
 * register: isOpen :bool
 */
export const changeModalState = modalState => ({
  type: CHANGE_MODAL_STATE,
  payload: modalState,
})

const initialState = {
  loginError: null,
  registerError: null,
  isLoading: false,
  isLoggedIn: false,
  loggedInUser: {},
  redirectToLogin: false, // we just registered, redirect to login
  modalsOpen: {
    register: false,
    login: false,
  }
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
        registerError: null,
        loginError: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        loggedInUser: payload,
        //TODO: Do i need to close modals when login?
        modalsOpen: {
          login: false,
          register: false,
        }
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        loginError: payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirectToLogin: true,
      };
    case FINISH_REDIRECT:
      return {
        ...state,
        redirectToLogin: false,
      };
    case REGISTER_FAILED:
      return {
        ...state,
        isLoading: false,
        registerError: payload,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        loggedInUser: {},
      };
    case CHANGE_MODAL_STATE:
      return {
        ...state,
        modalsOpen: {
          ...state.modalsOpen,
          ...payload,
        }
      }
    default:
      return state;
  }
}
