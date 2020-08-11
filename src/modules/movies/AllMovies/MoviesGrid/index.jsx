import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { MaterialSurface } from 'components/basic';
import { Loading } from 'components';
import { addBookmark, removeBookmark } from 'reducers/userReducer';
import MovieCard from './MovieCard';
import { StyledMoviesGrid, Wrapper, } from './styles';

const MoviesGrid = ({ isLoading, movies, posters }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const { bookmarks, bookmarksLoading, userId, isLoggedIn } = useSelector(({ userReducer, auth }) => ({
    bookmarks: userReducer.bookmarks,
    userId: auth.loggedInUser.userId,
    isLoggedIn: auth.isLoggedIn,
    bookmarksLoading: userReducer.bookmarksLoading,
  }))
  
  function openMovie(movieId) {
    history.push('/movie/' + movieId);
  }
  
  function bookmarkMovie(movieId, movieName) {
    const isAdded = bookmarks.some(bookmark => bookmark.movieId === movieId && bookmark.movieName === movieName);
    
    if (!isAdded)
      dispatch(addBookmark(movieId, userId, movieName))
    else
      dispatch(removeBookmark(movieId, userId, movieName))
  }
  
  function renderMovies() {
    return movies.map(movie => {
        const url = posters[movie.id];
        const isBookmarked = bookmarks.some(bookmark => bookmark.movieId === movie.id && bookmark.movieName === movie.movieName)
        return (
          <MovieCard
            key={movie.id}
            onClick={openMovie}
            showBookmark={isLoggedIn}
            onBookMarkClick={bookmarkMovie}
            isBookmarked={isBookmarked}
            isLoading={bookmarksLoading[movie.id]}
            movie={movie}
            poster={url}
          />
        );
      },
    );
  }
  
  
  return (
    <Wrapper>
      <Loading isLoading={isLoading} key='loading'/>
      <StyledMoviesGrid
        fadeIn={!isLoading}
        moviesPerPage={movies.length}
      >
        {renderMovies()}
      </StyledMoviesGrid>
    </Wrapper>
  
  );
};

export default MoviesGrid;
