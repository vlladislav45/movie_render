import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { MovieNameText, MoviePoster, PosterContainer, SingleMovie, StyledMoviesContainer } from './styles';
import { fetchMovies, getMoviesCount } from 'reducers/moviesReducer';
import { Loading, Rating } from 'components';
import MoviesPagination from '../MoviesPagination';
import { MOVIES_PER_PAGE } from '../../../config/MoviesConfig';

const MoviesContainer = props => {
  const dispatch = useDispatch();
  // const [ movies, setMovies ] = useState([]);

  const { movies, isLoading } = useSelector(({ moviesReducer }) => ({
    movies: moviesReducer.movies,
    selectedPage: moviesReducer.selectedPage,
    isLoading: moviesReducer.isLoading,
  }));

  useEffect(() => {
    dispatch(fetchMovies(0, MOVIES_PER_PAGE));
    dispatch(getMoviesCount());
    // const moviesFromBE = require('../stub.json');
    // setMovies(moviesFromBE);
  }, []);

  function renderMovies() {
    return movies.map(movie => (
        <SingleMovie shouldElevateWhenHover elevation={8} key={movie.movieName} withRipple>
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
    <StyledMoviesContainer>
      <MoviesPagination itemsCount={movies.length || 5}/>
      {isLoading ? <Loading /> : renderMovies()}
    </StyledMoviesContainer>
  );
};

export default withRouter(MoviesContainer);
