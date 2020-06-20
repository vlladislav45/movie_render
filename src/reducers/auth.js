import AuthAPI from 'api/AuthAPI';

const LOGIN_SUCCESS = 'LOGIC_SUCCESS';
const LOGOUT = 'LOGOUT';


export const attemptLogin = (account, password) => dispatch => {
  // dispatch({
  //   type: LOGIN_SUCCESS,
  //   payload: {
  //     username: 'vlad',
  //   },
  // });

  const formData = new FormData();
  formData.append('username', account);
  formData.append('password', password);

  AuthAPI.login(formData).then(res => {
    const { data } = res;
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  })
    .catch(err => {
      console.error(err);
    });
};

export const logout = () => ({
  type: LOGOUT,
});

const initialState = {
  isLoggedIn: true,
  isLoading: false,
  loggedInUser: {
    username: 'Stefan',
  }
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch ( type ) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        loggedInUser: payload
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
