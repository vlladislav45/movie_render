const UPDATE_USER_DATA = 'UPDATE_USER_DATA';

export const updateUserData = (dataKey, dataValue) => dispatch => {

  dispatch({
    type: UPDATE_USER_DATA,
    payload: { dataKey, dataValue },
  });
};

const STUB_INFO = {
  firstName: 'Stefan',
  fathersName: 'Dimitrov',
  familyName: 'Ivanov',
  age: 28,
  sex: 'M',
  address: null,
};

const initialState = {
  user: {
    userInfo: STUB_INFO,
  },
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_USER_DATA:
      return {
        ...state,
        user: {
          ...state.user,
          userInfo: {
            ...state.user.userInfo,
            [payload.dataKey]: payload.dataValue,
          },
        },
      };
    default:
      return state;
  }
}
