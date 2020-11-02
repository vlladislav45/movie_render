import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { useHistory } from 'react-router';
import { addBookmark, removeBookmark } from 'reducers/userReducer';
import { Loading } from 'components';
import MovieCard from './MovieCard';
import MoviePoster from './MoviePoster';
import { StyledMoviesGrid, Wrapper, } from './styles';

const selector = createSelector(
  store => store.userReducer,
  store => store.auth,
  (userReducer, auth) => ({
    bookmarks: userReducer.bookmarks,
    userId: auth.loggedInUser.userId,
    isLoggedIn: auth.isLoggedIn,
    bookmarksLoading: userReducer.bookmarksLoading,
  }))
const MoviesGrid = ({ isLoading, movies, posters, className }, ref) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { bookmarks, bookmarksLoading, userId, isLoggedIn } = useSelector(selector)

  const openMovie = useCallback(movieId => {
    history.push('/movie/' + movieId);
  }, [history]);

  const bookmarkMovie = useCallback((movieId, movieName) => {
    const isAdded = bookmarks.some(bookmark => bookmark.movieId === movieId && bookmark.movieName === movieName);

    if (!isAdded)
      dispatch(addBookmark(movieId, userId, movieName))
    else
      dispatch(removeBookmark(movieId, userId, movieName))
  }, [bookmarks])

  const renderMovies = useCallback(() => {
    return movies.map((movie) => {
      // if (!movie) return <MovieCard key={`movie_${index}`} isEmpty={true}/>
      const isBookmarked = bookmarks.some(bookmark => bookmark.movieId === movie.id && bookmark.movieName === movie.movieName)
      return (
        <div className='movie-container'>
          <div className='movie-inner'>
            <div className='movie-poster'>
              <MoviePoster
                key={movie.id}
                onClick={openMovie}
                showBookmark={isLoggedIn}
                onBookMarkClick={bookmarkMovie}
                isBookmarked={isBookmarked}
                isLoading={bookmarksLoading[movie.id]}
                movie={movie}
                userId={userId}
                isLoggedIn={isLoggedIn}
                poster={posters[movie.id]}
              />
            </div>
            <div className='movie-info'>
              {/* Display the whole movie info (display element on hover) */}
              {/* <MovieCard
                key={movie.id}
                onClick={openMovie}
                showBookmark={isLoggedIn}
                onBookMarkClick={bookmarkMovie}
                isBookmarked={isBookmarked}
                isLoading={bookmarksLoading[movie.id]}
                movie={movie}
                userId={userId}
                isLoggedIn={isLoggedIn}
                poster={posters[movie.id]}
              /> */}
            </div>
          </div>
        </div>
      );
    },
    );
  }, [movies, posters, bookmarks, bookmarksLoading, isLoggedIn])


  return (
    <Wrapper className={className} ref={ref}>
      <Loading isLoading={isLoading} key='loading' />
      <StyledMoviesGrid
        fadeIn={!isLoading}
      >
        {renderMovies()}
      </StyledMoviesGrid>
    </Wrapper>
  );
};

export default React.forwardRef(MoviesGrid);
