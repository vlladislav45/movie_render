import { combineReducers } from 'redux';
import auth from './auth';
import themeReducer from './themeReducer';
import uiReducer from './uiReducer';
import moviesReducer from './moviesReducer';
import connectionReducer from './connectionReducer';
import userReducer from './userReducer';
import moderatorReducer from './moderatorReducer';
import bookmarksReducer from './bookmarksReducer';

const reducers = combineReducers({
  auth,
  bookmarksReducer,
  themeReducer,
  uiReducer,
  moviesReducer,
  userReducer,
  moderatorReducer,
  connectionReducer,
});

export default reducers;
