import { CHANGE_WINDOW_DIMENSIONS } from 'reducers/uiReducer';
import { changeMoviesPerPage } from '../reducers/moviesReducer';
import { FULL_HD, L, M, SM, XL, XS_SM } from 'utils/mediaUtils';


export default store => next => action => {
  const { type, payload } = action;
  if (type === CHANGE_WINDOW_DIMENSIONS) {
    const { dispatch, getState } = store;
    dispatch(changeMoviesPerPage(getMoviesPerPage(payload.device)));
  }
  
  next(action);
};

const getMoviesPerPage = media => {
  switch (media) {
    case XS_SM:
    case SM:
      return 1
    case M:
    case L:
      return 3;
    case XL:
      return 6;
    case FULL_HD:
      return 9;
    default:
      return 1;
  }
}