import { last } from 'lodash';

import { LOGIN_SUCCESS } from 'reducers/auth';
import { setBookmarks, updateUserData } from 'reducers/userReducer';
import { SELECTED_THEME, setTheme } from 'reducers/themeReducer';

export default store => next => action => {
  const { type, payload } = action;
  if (type === LOGIN_SUCCESS) {
    const { dispatch } = store;
    console.group('User info');
    console.log(payload);
    console.groupEnd();
    const { email, username, userId, bookmarks } = payload;
    const { userImages, firstName, gender, lastName } = payload.userInfo;
    const { selectedTheme } = payload['userPreferences'];
    localStorage.setItem(SELECTED_THEME, selectedTheme);
    dispatch(setTheme(selectedTheme));
    action.payload = {
      email, username, profileImage: last(userImages),
      userImages, userId,
    };
    
    dispatch(setBookmarks(bookmarks));
    
    dispatch(updateUserData('firstName', firstName));
    dispatch(updateUserData('gender', gender));
    dispatch(updateUserData('lastName', lastName));
  }
  
  next(action);
};
