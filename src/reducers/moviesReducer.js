import MovieAPI from 'api/MovieAPI';

const FETCH_ALL_MOVIES = 'FETCH_ALL_MOVIES';
const MOVIES_COUNT = 'MOVIES_COUNT';

export const fetchMovies = (page, size) => dispatch => {
  MovieAPI.getByPage(page,size).then(res => {
    const { data } = res;
    dispatch({
      type: FETCH_ALL_MOVIES,
      payload: data,
    })
  })
};

export const getMoviesCount = () => dispatch => {
  MovieAPI.getMoviesCount().then(res => {
    const { data } = res;
    dispatch({
      type: MOVIES_COUNT,
      payload: data,
    })
  })
};

const initialState = {
  movies: [],
  count: 0,
};

export default ( state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ALL_MOVIES: return {
      ...state,
      movies: payload,
    };
    case MOVIES_COUNT: return {
      ...state,
      count: payload,
    };
    default: return state;
  }
}