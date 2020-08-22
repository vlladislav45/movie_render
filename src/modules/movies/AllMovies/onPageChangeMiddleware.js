import {
  CHANGE_SELECTED_PAGE,
  fetchMovies,
  getMoviesCount,
  UPDATE_FILTER,
  RESET_FILTER,
  FETCH_ALL_MOVIES
} from 'reducers/moviesReducer';

//TODO: I may not need this
export default store => next => action => {
  const { type, payload } = action;
  if (type === CHANGE_SELECTED_PAGE) {
    const { dispatch, getState } = store;
    const size = getState().moviesReducer.moviesPerPage;
    dispatch(fetchMovies(payload,size));
  } else if (type === UPDATE_FILTER || type === RESET_FILTER) {
    const { dispatch, getState } = store;
    const { selectedPage, moviesPerPage } = getState().moviesReducer;
    dispatch(fetchMovies(selectedPage, moviesPerPage));
    dispatch(getMoviesCount());
  }
  
  next(action);
};
