const API_KEY = 'ba002753';
const OMDB_API = `http://www.omdbapi.com/?apikey=${API_KEY}&`;
const POSTER_OMDB_API = `http://img.omdbapi.com/?apikey=${API_KEY}&`;

const SUGGESTED_TITLES = 'SUGGESTED_TITLES';
const MOVIE_DATA = 'MOVIE_DATA';
const START_LOADING_SUGGESTIONS = 'START_LOADING_SUGGESTIONS';

export const suggestTitles = text => dispatch => {
  fetch(`${OMDB_API}s=${text}`).then(res => res.json()).then(movies => {
    dispatch({
      type: SUGGESTED_TITLES,
      payload: movies,
    });
  });
};

export const getSuggestionData = id => dispatch => {
  dispatch({ type: START_LOADING_SUGGESTIONS });
  fetch(`${OMDB_API}i=${id}&plot=full`).then(res => res.json()).then(movie => {
    dispatch({
      type: MOVIE_DATA,
      payload: movie,
    });
  });
};

const initialState = {
  movies: [ /* Array of objects with Title, Year etc etc */],
  error: '',
  success: false,
  totalResults: 0,
  movieData: {
    isLoading: false,
    /* The rest of the movie data */
  },
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SUGGESTED_TITLES: {
      const { Response, Search, Error, totalResults } = payload;
      return {
        ...state,
        error: Error,
        movies: Search,
        success: Response === 'True',
        totalResults,
      };
    }
    case START_LOADING_SUGGESTIONS:
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
    default:
      return state;
  }
}
