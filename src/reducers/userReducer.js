import UserAPI from 'api/UserAPI';
import MovieAPI from 'api/MovieAPI';
import { enqueueSnackbarMessage } from './uiReducer';

const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
const ADD_BOOKMARK_MOVIE = 'ADD_BOOKMARK_MOVIE';
const REMOVE_BOOKMARK_MOVIE = 'REMOVE_BOOKMARK_MOVIE';
const SET_BOOKMARKS = 'SET_BOOKMARKS';
const START_LOADING_BOOKMARKS = 'START_LOADING_BOOKMARKS';

export const updateUserData = (dataKey, dataValue, userId) => dispatch => {
  if (userId) {
    UserAPI.updateData({
      [dataKey]: dataValue,
      userId,
    }).then(res => {
      console.log(res);
      
      dispatch({
        type: UPDATE_USER_DATA,
        payload: { dataKey, dataValue },
      });
    });
  } else {
    dispatch({
      type: UPDATE_USER_DATA,
      payload: { dataKey, dataValue },
    });
  }
};

export const setBookmarks = bookmarks => ({
  type: SET_BOOKMARKS,
  payload: bookmarks,
})

export const removeBookmark = (movieId, userId, movieName, showUndo = true) => dispatch => {
  dispatch({ type: START_LOADING_BOOKMARKS, payload: movieId });
  return MovieAPI.addOrRemoveBookmark({ movieId, userId }).then(() => {
    dispatch({ type: REMOVE_BOOKMARK_MOVIE, payload: { movieName, movieId } });
    showUndo && dispatch(enqueueSnackbarMessage(
      `${movieName} removed from bookmarks`,
      {
        ['Undo']: () => dispatch(addBookmark(movieId, userId, movieName, false)),
      },
      { closeOnAction: ['Undo'] })
    )
  })
}

export const addBookmark = (movieId, userId, movieName, showUndo = true) => dispatch => {
  dispatch({ type: START_LOADING_BOOKMARKS, payload: movieId });
  MovieAPI.addOrRemoveBookmark({ movieId, userId }).then(() => {
    dispatch({ type: ADD_BOOKMARK_MOVIE, payload: { movieName, movieId } });
    showUndo && dispatch(enqueueSnackbarMessage(
      `${movieName} added to bookmarks`,
      {
        ['Undo']: () => dispatch(removeBookmark(movieId, userId, movieName, false)),
      },
      { closeOnAction: ['Undo'] }
      )
    )
  })
}

const initialState = {
  user: {
    userInfo: {},
  },
  // Array of objects with shape { movieName, movieId }
  bookmarks: [],
  // Object with key movieId and value isLoading
  bookmarksLoading: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  
  switch (type) {
    case UPDATE_USER_DATA:
      return {
        ...state,
        user: {
          ...state.user,
          userInfo: {
            ...state.user.userInfo,
            [payload.dataKey]: payload.dataValue,
          },
        },
      };
    case ADD_BOOKMARK_MOVIE:
      return {
        ...state,
        bookmarksLoading: {
          ...state.bookmarksLoading,
          [payload.movieId]: false,
        },
        bookmarks: state.bookmarks.concat(payload)
      }
    case REMOVE_BOOKMARK_MOVIE: {
      const nextBookmarks = state.bookmarks.filter(bookmark => bookmark.movieId !== payload.movieId)
      return {
        ...state,
        bookmarksLoading: {
          ...state.bookmarksLoading,
          [payload.movieId]: false,
        },
        bookmarks: nextBookmarks,
      }
    }
    case SET_BOOKMARKS:
      return {
        ...state,
        bookmarks: payload,
      }
    case START_LOADING_BOOKMARKS:
      return {
        ...state,
        bookmarksLoading: {
          ...state.bookmarksLoading,
          [payload]: true,
        },
      }
    default:
      return state;
  }
}
