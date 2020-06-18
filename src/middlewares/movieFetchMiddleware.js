import { CHANGE_SELECTED_PAGE, fetchMovies } from '../reducers/moviesReducer';
import { MOVIES_PER_PAGE } from '../config/MoviesConfig';

export default store => next => action => {
  if (action.type === CHANGE_SELECTED_PAGE) {
    store.dispatch(fetchMovies(action.payload, MOVIES_PER_PAGE));
  }

  next(action);
};