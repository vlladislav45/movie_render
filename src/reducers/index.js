import { combineReducers } from 'redux';
import auth from './auth';
import themeReducer from './themeReducer';
import uiReducer from './uiReducer';

const reducers = combineReducers({
  auth,
  themeReducer,
  uiReducer,
});

export default reducers;
