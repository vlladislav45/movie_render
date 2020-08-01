import { combineReducers } from 'redux';
import auth from './auth';
import themeReducer from './themeReducer';
import uiReducer from './uiReducer';
import moviesReducer from './moviesReducer';
import connectionReducer from './connectionReducer';
import userReducer from './userReducer';
import moderatorReducer from './moderatorReducer';

const reducers = combineReducers({
  auth,
  themeReducer,
  uiReducer,
  moviesReducer,
  userReducer,
  moderatorReducer,
  connectionReducer,
});

export default reducers;
