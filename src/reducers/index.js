import { combineReducers } from 'redux';
import auth from './auth';
import themeReducer from './themeReducer';
import uiReducer from './uiReducer';
import moviesReducer from './moviesReducer';

const reducers = combineReducers({
  auth,
  themeReducer,
  uiReducer,
  moviesReducer,
});

export default reducers;
