const LOGIN_SUCCESS = 'LOGIC_SUCCESS';
const LOGOUT = 'LOGOUT';

// export const login = credentials => dispatch => {
//   const API = null; //new AuthAPI()

//   dispatch({ type: ATTEMPT_LOGIN })
//   return new Promise((resolve, reject) => {
//     API.login(credentials).then(res => {
//       const { user, token } = res
//       localStorage.setItem(AUTH_TOKEN, token)
//       dispatch({ type: LOGIN_SUCCESS, payload: user })
//       resolve()
//     }).catch(err => {
//       dispatch({ type: LOGIN_FAIL, payload: err })
//       reject()
//     })
//   })
// }

// Since there is an interceptor, that adds the token
// to header if needed, no need to pass it to request
// export const isLoggedIn = () => dispatch => {
//   const API = null; //new AuthAPI()

//   const token = localStorage.getItem(AUTH_TOKEN)
//   if (!token) {
//     return dispatch({ type: LOGIN_FAIL })
//   }

//   dispatch({ type: ATTEMPT_LOGIN })

//   API.checkToken(token).then(res => {
//     const { user } = res
//     if (user)
//       return dispatch({ type: LOGIN_SUCCESS, payload: { ...user } })
//     else {
//       localStorage.removeItem(AUTH_TOKEN)
//       return dispatch({ type: LOGIN_FAIL })
//     }
//   })
// }

// export const logout = () => {
//   const API = null; // new AuthAPI()

//   const token = localStorage.getItem(AUTH_TOKEN)
//   // noinspection JSIgnoredPromiseFromCall
//   API.logout({ token }).then(() => {
//     localStorage.removeItem(AUTH_TOKEN)
//   })
//   return { type: LOGOUT }
// }

export const attemptLogin = (account, password) => dispatch => {
  // TODO: API call
  dispatch({
    type: LOGIN_SUCCESS,
    payload: {
      username: 'Vladislav',
    }
  })
}

export const logout = () => ({
  type: LOGOUT,
})

const initialState = {
  isLoggedIn: true,
  isLoading: false,
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        loggedInUser: payload
      }
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        loggedInUser: null,
      }

    default:
      return state
  }
}