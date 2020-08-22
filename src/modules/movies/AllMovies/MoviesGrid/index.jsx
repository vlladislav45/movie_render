import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { useHistory } from 'react-router';
import { addBookmark, removeBookmark } from 'reducers/userReducer';
import { Loading } from 'components';
import useDeviceDimensions from 'hooks/useDeviceDimensions';
import { isVisible } from 'utils/DomUtils';
import MovieCard from './MovieCard';
import { StyledMoviesGrid, Wrapper, } from './styles';

const selector = createSelector(
  store => store.userReducer,
  store => store.auth,
  store => store.moviesReducer,
  (userReducer, auth, moviesReducer) => ({
    bookmarks: userReducer.bookmarks,
    userId: auth.loggedInUser.userId,
    isLoggedIn: auth.isLoggedIn,
    bookmarksLoading: userReducer.bookmarksLoading,
    selectedPage: moviesReducer.selectedPage,
  }))

const MoviesGrid = ({ isLoading, movies, posters, moviesPerPage, className }, ref) => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const { device } = useDeviceDimensions('MoviesGrid');
  
  const { bookmarks, bookmarksLoading, userId, isLoggedIn, selectedPage } = useSelector(selector)
  
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
    return movies.map((movie, index) => {
        if (!movie) return <MovieCard key={`movie_${index}`} isEmpty={true}/>
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
    <Wrapper className={className} ref={ref}>
      <Loading isLoading={isLoading} key='loading'/>
      <StyledMoviesGrid
        $device={device}
        fadeIn={!isLoading}
        moviesPerPage={moviesPerPage}
      >
        {renderMovies()}
      </StyledMoviesGrid>
    </Wrapper>
  
  );
};

export default React.forwardRef(MoviesGrid);
