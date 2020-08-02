const BOOKMARK_MOVIE = 'BOOKMARK_MOVIE';
const DE_BOOKMARK_MOVIE = 'DE_BOOKMARK_MOVIE';

export const bookmark = movie => ({
  type: BOOKMARK_MOVIE,
  payload: movie,
})

export const removeBookmark = movie => ({
  type: DE_BOOKMARK_MOVIE,
  payload: movie,
})

// TODO: Connect to backend
// Array with object with shape movieId: id of the movie and movieName: the name of the movie
const initialState = {
  bookmarks: [
    {
      movieId: 2,
      movieName: 'Fast and furious 2',
    }
  ],
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case BOOKMARK_MOVIE:
      return {
        ...state,
        bookmarks: state.bookmarks.push(payload),
      }
    case DE_BOOKMARK_MOVIE:
      return {
        ...state,
        bookmarks: state.bookmarks.filter(m => m.movieId !== payload.movieId),
      }
    default:
      return state;
  }
}