import MovieAPI from 'api/MovieAPI';

const FETCH_ALL_MOVIES = 'FETCH_ALL_MOVIES';

export const fetchMovies = (page, size) => dispatch => {
  MovieAPI.getByPage(page,size).then(res => {
    const { data } = res;
    dispatch({
      type: FETCH_ALL_MOVIES,
      payload: data,
    })
  })
};

const initialState = {
  movies: []
};

export default ( state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ALL_MOVIES: return {
      ...state,
      movies: payload,
    }
    default: return state;
  }
}