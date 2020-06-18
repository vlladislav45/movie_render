import MovieAPI from 'api/MovieAPI';

export const CHANGE_SELECTED_PAGE = 'CHANGE_SELECTED_PAGE';
export const FETCH_ALL_MOVIES = 'FETCH_ALL_MOVIES';
const MOVIES_COUNT = 'MOVIES_COUNT';
const START_LOADING = 'START_LOADING';

export const fetchMovies = (page, size) => dispatch => {
  dispatch({
    type: START_LOADING,
  });

  setTimeout(() => {
    const data = require('../modules/movies/stub.json');

    dispatch({
      type: FETCH_ALL_MOVIES,
      payload: data.slice(page * size, page * size + size),
    })
  }, 350);

  // MovieAPI.getByPage(page,size).then(res => {
  //   const { data } = res;
  //   dispatch({
  //     type: FETCH_ALL_MOVIES,
  //     payload: data,
  //   })
  // })
};

export const getMoviesCount = () => dispatch => {
  const data = require('../modules/movies/stub.json');
  dispatch({
    type: MOVIES_COUNT,
    payload: data.length,
  });

  // MovieAPI.getMoviesCount().then(res => {
  //   const { data } = res;
  //   dispatch({
  //     type: MOVIES_COUNT,
  //     payload: data,
  //   })
  // })
};

export const changeSelectedPage = newPage => ({
  type: CHANGE_SELECTED_PAGE,
  payload: newPage,
});

const initialState = {
  movies: [],
  count: 0,
  selectedPage: 0,
  isLoading: false,
};

export default ( state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ALL_MOVIES: return {
      ...state,
      movies: payload,
      isLoading: false,
    };
    case MOVIES_COUNT: return {
      ...state,
      count: payload,
    };
    case CHANGE_SELECTED_PAGE: return {
      ...state,
      selectedPage: payload,
    };
    case START_LOADING: return {
      ...state,
      isLoading: true,
    };
    default: return state;
  }
}