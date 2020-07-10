import MovieAPI from 'api/MovieAPI';
import { DEFAULT_MOVIES_PER_PAGE } from 'config/MoviesConfig';

//Genres
const FETCH_GENRES = 'FETCH_GENRES';

const CHANGE_SELECTED_PAGE = 'CHANGE_SELECTED_PAGE';
const CHANGE_MOVIES_PER_PAGE = 'CHANGE_MOVIES_PER_PAGE';

const FETCH_ALL_MOVIES = 'FETCH_ALL_MOVIES';
const START_LOADING_ALL = 'START_LOADING_ALL';
const MOVIES_COUNT = 'MOVIES_COUNT';

const FETCH_SINGLE_MOVIE = 'FETCH_SINGLE_MOVIE';
const START_LOADING_SINGLE = 'START_LOADING_SINGLE';
// FILTERS
const UPDATE_FILTER = 'UPDATE_FILTER';
const RESET_FILTER = 'RESET_FILTER';

export const fetchGenres = () => dispatch => {
  MovieAPI.getGenres().then(res => {
    const { data } = res;

    dispatch({
      type: FETCH_GENRES,
      payload: data,
    });
  });
};

export const fetchMovies = (page, size) => (dispatch, getState) => {
  dispatch({
    type: START_LOADING_ALL,
  });

  const { moviesReducer: { filters } } = getState();

  MovieAPI.getByPage(page, size, { ...filters }).then(res => {
    const { data } = res;
    dispatch({
      type: FETCH_ALL_MOVIES,
      payload: data,
    });
  }).catch(err => dispatch({
    type: FETCH_ALL_MOVIES,
    payload: [],
  }));
};

export const getMoviesCount = () => (dispatch, getState) => {
  const { moviesReducer: { filters } } = getState();

  MovieAPI.getMoviesCount({ ...filters }).then(res => {
    const { data } = res;
    dispatch({
      type: MOVIES_COUNT,
      payload: data,
    });
  }).catch(() => dispatch({
    type: MOVIES_COUNT,
    payload: 0,
  }));
};

export const fetchSingleMovie = movieId => dispatch => {
  dispatch({
    type: START_LOADING_SINGLE,
  });

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

// FILTER
export const updateFilter = filter => ({
  type: UPDATE_FILTER,
  payload: filter,
});

export const resetFilter = () => ({
  type: RESET_FILTER,
});

const initialState = {
  genres: [],
  movies: [],
  count: 0,
  selectedPage: 0,
  moviesPerPage: DEFAULT_MOVIES_PER_PAGE,
  isLoading: false,
  selectedMovie: {
    movieInfo: {},
    isLoading: false,
  },
  filters: {
    search: '',
    genres: [],
  },
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_GENRES:
      return {
        ...state,
        genres: payload,
      };
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
    case START_LOADING_ALL:
      return {
        ...state,
        isLoading: true,
      };
    case START_LOADING_SINGLE:
      return {
        ...state,
        selectedMovie: {
          ...state.selectedMovie,
          isLoading: true,
        },
      };
    case FETCH_SINGLE_MOVIE:
      return {
        ...state,
        selectedMovie: {
          ...state.selectedMovie,
          movieInfo: payload,
          isLoading: false,
        },
      };
    case RESET_FILTER:
      return {
        ...state,
        filters: {},
      };
    case UPDATE_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...payload,
        },
      };
    default:
      return state;
  }
}
