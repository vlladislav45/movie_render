import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MovieNameText, MoviePoster, PosterContainer, SingleMovie, StyledMoviesContainer } from './styles';
import { fetchMovies, getMoviesCount } from 'reducers/moviesReducer';
import { Rating, Pagination } from 'components';

const MoviesContainer = props => {
  const dispatch = useDispatch();
  // const [ movies, setMovies ] = useState([]);

  const { movies } = useSelector(({ moviesReducer }) => ({
    movies: moviesReducer.movies
  }));

  useEffect(() => {
    dispatch(fetchMovies(0, 10));
    dispatch(getMoviesCount());
    // const moviesFromBE = require('../stub.json');
    // setMovies(moviesFromBE);
  }, []);

  function renderMovies() {
    return movies.map(movie => (
        <SingleMovie shouldElevateWhenHover elevation={7} key={movie.movieName} withRipple>
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
      {/*<div>*/}
      {/*  <Input label='Basic' helperText='Some helper text'/>*/}
      {/*  <Input errorText='error text' label='With Error' />*/}
      {/*  <Input helperText='helper text' placeholder='Placeholder' label='' />*/}
      {/*  <Input value='Prefilled' />*/}
      {/*</div>*/}
      {renderMovies()}
      <br />
      <Pagination itemsCount={movies.length || 5} />
    </StyledMoviesContainer>
  );
};

export default MoviesContainer;
