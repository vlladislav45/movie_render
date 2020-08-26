import AuthAPI from 'api/AuthAPI';
import { JWT_TOKEN } from 'config/authConstants';
import { enqueueSnackbarMessage } from './uiReducer';
import { setBookmarks } from './userReducer';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const TOKEN_EXPIRED = 'TOKEN_EXPIRED';
const START_LOADING = 'START_LOADING';
const LOGIN_FAILED = 'LOGIN_FAILED';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAILED = 'REGISTER_FAILED';
const LOGOUT = 'LOGOUT';
const FINISH_REDIRECT = 'FINISH_REDIRECT';
const REDIRECT_TO_LOGIN = 'REDIRECT_TO_LOGIN';

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
        payload: data.error,
      });
    else
      dispatch({
        type: REGISTER_SUCCESS,
      });
  }).catch(err => console.log('Register error: ' + err));
};

export const logout = () => dispatch => {
  localStorage.removeItem(JWT_TOKEN);
  // Empty user bookmarks
  dispatch(setBookmarks([]));
  dispatch({
    type: LOGOUT,
  })
};

export const tokenExpired = () => dispatch => {
  if (!localStorage.getItem(JWT_TOKEN)) return; // Dont dispatch multiple snackbar messages
  dispatch(logout());
  dispatch({ type: TOKEN_EXPIRED });
  dispatch(enqueueSnackbarMessage(
    'Session expired, please login again',
    {
      'Login': () => dispatch({ type: REDIRECT_TO_LOGIN }),
      'Cancel': () => {
      }
    },
    {
      closeOnAction: ['Cancel', 'Login'],
    }
  ))
}

export const finishRedirect = () => ({
  type: FINISH_REDIRECT,
});

const initialState = {
  loginError: null,
  registerError: null,
  isLoading: false,
  isLoggedIn: false,
  loggedInUser: {},
  redirectToLogin: false, // we just registered, redirect to login
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
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        loginError: payload,
      };
    case REDIRECT_TO_LOGIN:
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
        isLoading: false,
        loggedInUser: {},
      };
    default:
      return state;
  }
}
