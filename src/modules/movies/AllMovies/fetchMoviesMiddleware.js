import {
  CHANGE_SELECTED_PAGE,
  fetchMovies,
  getMoviesCount,
  RESET_FILTER,
  UPDATE_FILTER,
} from 'reducers/moviesReducer';

/**
 * Middleware responsible for fetching movies
 */
export default store => next => action => {
  const { type, payload } = action;
  if (type === CHANGE_SELECTED_PAGE) {
    const { dispatch, getState } = store;
    const { moviesPerPage: size, selectedPage } = getState().moviesReducer;
    
    if (payload === selectedPage) return;
    
    dispatch(fetchMovies(payload, size));
  } else if (type === UPDATE_FILTER || type === RESET_FILTER) {
    // Update store filters and then fetch the movies
    next(action);
    const { dispatch, getState } = store;
    const { selectedPage, moviesPerPage } = getState().moviesReducer;
    
    dispatch(getMoviesCount());
    dispatch(fetchMovies(selectedPage, moviesPerPage));
    
    return;
  }
  
  next(action);
};
