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
    const { email, username, userId, bookmarks, createdTime } = payload;
    const { userImages, firstName, gender, lastName } = payload.userInfoViewModel;
    const { selectedTheme } = payload.userPreferences;
    localStorage.setItem(SELECTED_THEME, selectedTheme);
    dispatch(setTheme(selectedTheme));
    const profileImage = userImages ? last(userImages).imageName : null
    action.payload = {
      email, username, profileImage,
      userImages, userId,
    };
    
    dispatch(setBookmarks(bookmarks));
  
    dispatch(updateUserData('firstName', firstName));
    dispatch(updateUserData('gender', gender));
    dispatch(updateUserData('lastName', lastName));
    dispatch(updateUserData('createdTime', createdTime));
  }
  
  next(action);
};
