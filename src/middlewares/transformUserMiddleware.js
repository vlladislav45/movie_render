import { last } from 'lodash';

/**
 *
 */
import { LOGIN_SUCCESS } from '../reducers/auth';
import { updateUserData } from '../reducers/userReducer';

export default store => next => action => {
  const { type, payload } = action;
  if (type === LOGIN_SUCCESS) {
    const { getState, dispatch } = store;
    console.log(payload);
    const { email, username, userId } = payload;
    const { userImages, firstName, gender, lastName } = payload.userInfo;
    action.payload = {
      email, username, profileImage: last(userImages),
      userImages, userId,
    };

    dispatch(updateUserData('firstName', firstName));
    dispatch(updateUserData('gender', gender));
    dispatch(updateUserData('lastName', lastName));


  }

  next(action);
};
