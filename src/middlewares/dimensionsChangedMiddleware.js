import { CHANGE_WINDOW_DIMENSIONS } from 'reducers/uiReducer';
import { changeMoviesPerPage } from '../reducers/moviesReducer';

//TODO: I may not need this
export default store => next => action => {
  const { type, payload } = action;
  if (type === CHANGE_WINDOW_DIMENSIONS) {
    // const { dispatch, getState } = store;
    // dispatch(changeMoviesPerPage());
  }
  
  next(action);
};
