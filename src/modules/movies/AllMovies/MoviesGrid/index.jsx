import React, { useEffect, useState } from 'react';
import { Loading, Rating } from 'components';
import {
  MovieNameText,
  MoviePoster,
  Wrapper,
  PosterContainer,
  Views,
  Year,
  StyledMoviesGrid,
} from './styles';
import MovieCard from './MovieCard';
import { MaterialSurface } from 'components/basic';
import { useHistory } from 'react-router';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { StyledMoviesContainer } from '../styles';
import { bookmark } from '../../../../reducers/bookmarksReducer';
import { useDispatch } from 'react-redux';
import { enqueueSnackbarMessage } from '../../../../reducers/uiReducer';

const MoviesGrid = ({ isLoading, movies, posters }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  function openMovie(movieId) {
    history.push('/movie/' + movieId);
  }
  
  function bookmarkMovie(movieId, movieName) {
    dispatch(enqueueSnackbarMessage(`${movieName} bookmarked successfully`, {
      ['Dismiss']: () => {
      }
    }, { closeOnAction: 'Dismiss' }))
    // TODO: Bookmark it
  }
  
  function renderMovies() {
    return movies.map(movie => {
        let url = posters[movie.id];
        return (
          <MovieCard // This is withRipple HOC so i need to simulate it as material surface
            key={movie.id}
            onClick={openMovie}
            onBookMarkClick={bookmarkMovie}
            movie={movie}
            poster={url}
            hocProps={{
              size: 's',
              elevation: 7,
              shouldElevateWhenHover: true,
            }}
            tag={MaterialSurface}
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
