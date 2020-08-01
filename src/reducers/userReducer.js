import UserAPI from '../api/UserAPI';

const UPDATE_USER_DATA = 'UPDATE_USER_DATA';

export const updateUserData = (dataKey, dataValue, userId) => dispatch => {
  if (userId) {
    UserAPI.updateData({
      [dataKey]: dataValue,
      userId,
    }).then(res => {
      console.log(res);

      dispatch({
        type: UPDATE_USER_DATA,
        payload: { dataKey, dataValue },
      });
    });
  } else {
    dispatch({
      type: UPDATE_USER_DATA,
      payload: { dataKey, dataValue },
    });
  }
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
    userInfo: {},
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
