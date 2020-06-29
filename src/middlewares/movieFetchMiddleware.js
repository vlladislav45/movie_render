import { CHANGE_SELECTED_PAGE, fetchMovies } from '../reducers/moviesReducer';

// TODO: No longer needed, rename if another middleware is necessary
export default store => next => action => {
  // if (action.type === CHANGE_SELECTED_PAGE) {
  //   const { getState, dispatch } = store;
  //   const { moviesPerPage } = getState().moviesReducer;
  //   dispatch(fetchMovies(action.payload, moviesPerPage));
  // }

  next(action);
};
