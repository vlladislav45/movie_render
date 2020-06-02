import { combineReducers } from 'redux';
import auth from './auth';
import themeReducer from './themeReducer';

const reducers = combineReducers({
  auth,
  themeReducer,
});

export default reducers;
