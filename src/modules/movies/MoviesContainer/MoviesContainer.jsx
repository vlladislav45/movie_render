import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getMoviesCount } from 'reducers/moviesReducer';
import { Loading, Rating } from 'components';
import { API_URL } from 'api/BaseAPI';
import MoviesPagination from '../MoviesPagination';
import { MovieNameText, MoviePoster, PosterContainer, SingleMovieLink, StyledMoviesContainer } from './styles';

const MoviesContainer = ({ history }) => {
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

  function imageLoaded(e) {
    // TODO:
  }

  function renderMovies() {
    return movies.map(movie => (
        <SingleMovieLink
          key={movie.id}
          elevation={8}
          onClick={() => history.push('/movie/' + movie.id)}
          shouldElevateWhenHover
          withRipple
        >
          <MovieNameText>{movie.movieName}</MovieNameText>
          {movie.year}
          <PosterContainer>
            <MoviePoster
              src={`${API_URL}movies/poster/${movie.posterName}`}
              onLoad={imageLoaded}
            />
          </PosterContainer>
          <Rating rating={movie.movieRating} maxStars={5}/>
          {movie.movieViews}
        </SingleMovieLink>
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
