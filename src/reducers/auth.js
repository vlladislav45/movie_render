import AuthAPI from 'api/AuthAPI';

const START_LOADING = 'START_LOADING';
const LOGIN_SUCCESS = 'LOGIC_SUCCESS';
const LOGIN_FAILED = 'LOGIN_FAILED';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAILED = 'REGISTER_FAILED';
const LOGOUT = 'LOGOUT';
const FINISH_REDIRECT = 'FINISH_REDIRECT';


export const attemptLogin = (account, password) => dispatch => {
  // dispatch({
  //   type: LOGIN_SUCCESS,
  //   payload: {
  //     username: 'vlad',
  //   },
  // });
  dispatch({
    type: START_LOADING,
  });

  const formData = new FormData();
  formData.append('username', account);
  formData.append('password', password);

  AuthAPI.login(formData).then(res => {
    const { data } = res;
    if (data.error)
      dispatch({
        type: LOGIN_FAILED,
        payload: data.error,
      });
    else
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
  }).catch(err => {
    console.log(err)
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

export const logout = () => ({
  type: LOGOUT,
});

export const finishRedirect = () => ({
  type: FINISH_REDIRECT,
});

const initialState = {
  loginError: null,
  registerError: null,
  redirectToLogin: false, // we just registered, redirect to login
  isLoggedIn: true,
  isLoading: false,
  loggedInUser: {
    username: 'Stefan',
  },
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
      }
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
        loggedInUser: null,
      };

    default:
      return state;
  }
}
