import MovieAPI from 'api/MovieAPI';
import { DEFAULT_MOVIES_PER_PAGE } from 'config/MoviesConfig';

export const CHANGE_SELECTED_PAGE = 'CHANGE_SELECTED_PAGE';
export const FETCH_ALL_MOVIES = 'FETCH_ALL_MOVIES';
const FETCH_SINGLE_MOVIE = 'FETCH_SINGLE_MOVIE';
const MOVIES_COUNT = 'MOVIES_COUNT';
const START_LOADING = 'START_LOADING';
const CHANGE_MOVIES_PER_PAGE = 'CHANGE_MOVIES_PER_PAGE';

// Only for testing purposes
let timeout;
export const fetchMovies = (page, size) => dispatch => {
  // clearTimeout(timeout);
  // dispatch({
  //   type: START_LOADING,
  // });
  //
  // timeout = setTimeout(() => {
  //   const data = require('../modules/movies/stub.json');
  //
  //   dispatch({
  //     type: FETCH_ALL_MOVIES,
  //     payload: data.slice(page * size, page * size + size),
  //   })
  // }, 350);

  MovieAPI.getByPage(page, size).then(res => {
    const { data } = res;
    dispatch({
      type: FETCH_ALL_MOVIES,
      payload: data,
    });
  });
};

export const getMoviesCount = () => dispatch => {
  // const data = require('../modules/movies/stub.json');
  // dispatch({
  //   type: MOVIES_COUNT,
  //   payload: data.length,
  // });

  MovieAPI.getMoviesCount().then(res => {
    const { data } = res;
    dispatch({
      type: MOVIES_COUNT,
      payload: data,
    });
  });
};

export const fetchSingleMovie = movieId => dispatch => {
  MovieAPI.getSingleMovie(movieId).then(res => {
    const { data } = res;

    dispatch({
      type: FETCH_SINGLE_MOVIE,
      payload: data,
    });
  });
};

export const changeSelectedPage = newPage => ({
  type: CHANGE_SELECTED_PAGE,
  payload: newPage,
});

export const changeMoviesPerPage = moviesPerPage => ({
  type: CHANGE_MOVIES_PER_PAGE,
  payload: moviesPerPage || DEFAULT_MOVIES_PER_PAGE,
});

const initialState = {
  movies: [],
  count: 0,
  selectedPage: 0,
  moviesPerPage: DEFAULT_MOVIES_PER_PAGE,
  isLoading: false,
  selectedMovie: {
    movieId: null,
    movieInfo: {},
    isLoading: false,
  }
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ALL_MOVIES:
      return {
        ...state,
        movies: payload,
        isLoading: false,
      };
    case MOVIES_COUNT:
      return {
        ...state,
        count: payload,
      };
    case CHANGE_SELECTED_PAGE:
      return {
        ...state,
        selectedPage: payload,
      };
    case CHANGE_MOVIES_PER_PAGE:
      return {
        ...state,
        moviesPerPage: payload,
      };
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_SINGLE_MOVIE:
      return {
        ...state,
        selectedMovie: {
          ...state.selectedMovie,
          movieInfo:  payload,
        }
      };
    default:
      return state;
  }
}