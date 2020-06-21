import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getMoviesCount } from 'reducers/moviesReducer';
import { Loading, Rating } from 'components';
import MoviesPagination from '../MoviesPagination';
import { MovieNameText, MoviePoster, PosterContainer, SingleMovie, StyledMoviesContainer } from './styles';

const MoviesContainer = () => {
  const dispatch = useDispatch();

  const { movies, moviesPerPage, isLoading } = useSelector(({ moviesReducer }) => ({
    movies: moviesReducer.movies,
    selectedPage: moviesReducer.selectedPage,
    moviesPerPage: moviesReducer.moviesPerPage,
    isLoading: moviesReducer.isLoading,
  }));

  useEffect(() => {
    dispatch(fetchMovies(0, moviesPerPage));
    dispatch(getMoviesCount());
  }, [moviesPerPage]);

  function renderMovies() {
    return movies.map(movie => (
        <SingleMovie shouldElevateWhenHover elevation={8} key={Math.random()} withRipple>
          <MovieNameText>{movie.movieName}</MovieNameText>
          <PosterContainer>
            <MoviePoster src={`data:image/png;base64,${movie.moviePoster}`}/>
          </PosterContainer>
          <Rating rating={1} maxStars={5}/>
        </SingleMovie>
      )
    );
  }

  return (
    <StyledMoviesContainer
      moviesPerPage={moviesPerPage}
    >
      <MoviesPagination/>
      {isLoading ? <Loading /> : renderMovies()}
    </StyledMoviesContainer>
  );
};

export default withRouter(MoviesContainer);
