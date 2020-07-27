const API_KEY = 'ba002753';
const OMDB_API = `http://www.omdbapi.com/?apikey=${API_KEY}&`;
const POSTER_OMDB_API = `http://img.omdbapi.com/?apikey=${API_KEY}&`;

const SUGGESTED_TITLES = 'SUGGESTED_TITLES';
const CLEAR_SUGGESTIONS = 'CLEAR_SUGGESTIONS';
const MOVIE_DATA = 'MOVIE_DATA';
const START_LOADING_SUGGESTIONS = 'START_LOADING_SUGGESTIONS';
const START_LOADING_SINGLE_SUGGESTION = 'START_LOADING_SINGLE_SUGGESTION';
const UPDATE_UPLOAD_INFO = 'UPDATE_UPLOAD_INFO';

export const suggestTitles = (text, page = 1) => dispatch => {
  dispatch({ type: START_LOADING_SUGGESTIONS });
  fetch(`${OMDB_API}s=${text}&page=${page}`).
    then(res => res.json()).
    then(movies => {
      dispatch({
        type: SUGGESTED_TITLES,
        payload: movies,
      });
    });
};

export const clearSuggestions = () => ({
  type: CLEAR_SUGGESTIONS,
});

export const getSuggestionData = id => dispatch => {
  dispatch({ type: START_LOADING_SINGLE_SUGGESTION });
  fetch(`${OMDB_API}i=${id}&plot=full`).then(res => res.json()).then(movie => {
    dispatch({
      type: MOVIE_DATA,
      payload: movie,
    });
  });
};

export const updateUploadInfo = (info, value) => ({
  type: UPDATE_UPLOAD_INFO,
  payload: {
    [info]: value,
  },
});

const initialState = {
  movies: [ /* Array of objects with Title, Year etc etc */],
  error: '',
  success: false,
  totalResults: 0,
  isLoading: false,
  movieData: {
    isLoading: false,
    /* The rest of the movie data */
  },
  uploadInfo: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case START_LOADING_SUGGESTIONS:
      return {
        ...state,
        isLoading: true,
      };
    case SUGGESTED_TITLES: {
      const { Search, Error, totalResults } = payload;
      return {
        ...state,
        error: Error,
        movies: Search,
        totalResults,
        isLoading: false,
      };
    }
    case CLEAR_SUGGESTIONS:
      return {
        ...state,
        movies: [],
        totalResults: 0,
      };
    case START_LOADING_SINGLE_SUGGESTION:
      return {
        ...state,
        movieData: {
          ...state.movieData,
          isLoading: true,
        },
      };
    case MOVIE_DATA: {
      return {
        ...state,
        movieData: {
          isLoading: false,
          ...payload,
        },
      };
    }
    case UPDATE_UPLOAD_INFO:
      return {
        ...state,
        uploadInfo: {
          ...state.uploadInfo,
          ...payload,
        }
      };
    default:
      return state;
  }
}
