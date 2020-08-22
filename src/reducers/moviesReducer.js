import MovieAPI from 'api/MovieAPI';
import ReviewsAPI from 'api/ReviewsAPI';
import { getMoviesPerPage } from 'config/MoviesConfig';

//Genres
const START_LOADING_GENRES = 'START_LOADING_GENRES';
const FETCH_GENRES = 'FETCH_GENRES';

export const CHANGE_SELECTED_PAGE = 'CHANGE_SELECTED_PAGE';
const CHANGE_MOVIES_PER_PAGE = 'CHANGE_MOVIES_PER_PAGE';

const FETCH_ALL_MOVIES = 'FETCH_ALL_MOVIES';
const START_LOADING_ALL = 'START_LOADING_ALL';
const MOVIES_COUNT = 'MOVIES_COUNT';

const FETCH_SINGLE_MOVIE = 'FETCH_SINGLE_MOVIE';
const START_LOADING_SINGLE = 'START_LOADING_SINGLE';
// FILTERS
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const RESET_FILTER = 'RESET_FILTER';

// Rating
const RATE_MOVE_SUCCESS = 'RATE_MOVE_SUCCESS';
const SET_REVIEWS = 'SET_REVIEWS';
const REVIEW_LOADING = 'REVIEW_LOADING';

const CLEAR_SINGLE = 'CLEAR_SINGLE';


const GENRES_STORAGE_KEY = 'genres';
export const fetchGenres = () => dispatch => {
  const cachedGenres = localStorage.getItem(GENRES_STORAGE_KEY);
  if (cachedGenres !== null) {
    dispatch({
      type: FETCH_GENRES,
      payload: JSON.parse(cachedGenres),
    })
    return;
  }
  
  dispatch({
    type: START_LOADING_GENRES,
  });
  
  MovieAPI.getGenres().then(res => {
    const { data } = res;
    
    localStorage.setItem(GENRES_STORAGE_KEY, JSON.stringify(data))
    dispatch({
      type: FETCH_GENRES,
      payload: data,
    });
  }).catch(err => alert(err.data));
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
      payload: data.count,
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
  payload: moviesPerPage || getMoviesPerPage(),
});

// FILTER
export const updateFilter = filter => ({
  type: UPDATE_FILTER,
  payload: filter,
});

export const resetFilter = () => ({
  type: RESET_FILTER,
});

// RATE
export const rateMovie = (movieId, userId, stars, review) => dispatch => new Promise(resolve => {
  ReviewsAPI.rateMovie({
    userId,
    movieId,
    movieRating: stars,
    comment: review,
  }).then(res => {
    const { data } = res;
    if (data.newRating)
      dispatch({
        type: RATE_MOVE_SUCCESS,
        payload: { newRating: data.newRating },
      });
    resolve(data);
  });
});

export const getReviewsByMovie = movieId => dispatch => {
  dispatch({ type: REVIEW_LOADING });
  ReviewsAPI.getReviewsByMovie(movieId).then(({ data }) => {
    dispatch({ type: SET_REVIEWS, payload: data })
  })
}

export const clearSingleMovie = () => ({
  type: CLEAR_SINGLE,
})

const initialState = {
  genres: [],
  movies: [],
  count: 0,
  selectedPage: 0,
  moviesPerPage: getMoviesPerPage(),
  isLoading: false,
  genresLoading: false,
  selectedMovie: {
    movieInfo: {},
    reviews: [],
    reviewsLoading: false,
    isLoading: false,
  },
  filters: {
    searchMovie: '',
    genres: [],
  },
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case START_LOADING_GENRES:
      return {
        ...state,
        genresLoading: true,
      };
    case FETCH_GENRES:
      return {
        ...state,
        genresLoading: false,
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
    case RATE_MOVE_SUCCESS:
      return {
        ...state,
        selectedMovie: {
          ...state.selectedMovie,
          movieInfo: {
            ...state.selectedMovie.movieInfo,
            movieRating: payload.newRating,
          },
        },
      };
    case SET_REVIEWS:
      return {
        ...state,
        selectedMovie: {
          ...state.selectedMovie,
          reviews: payload,
          reviewsLoading: false,
        }
      }
    case CLEAR_SINGLE:
      return {
        ...state,
        selectedMovie: initialState.selectedMovie,
      };
    case REVIEW_LOADING:
      return {
        ...state,
        selectedMovie: {
          ...state.selectedMovie,
          reviewsLoading: true,
        }
      }
    default:
      return state;
  }
}
