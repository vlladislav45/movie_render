import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MoviePoster, PosterContainer, SingleMovie, StyledMoviesContainer } from './styles';
import { Input } from 'components/basic';

const MoviesContainer = props => {
  const dispatch = useDispatch();
  const [ movies, setMovies ] = useState([]);

  // const { movies } = useSelector(({ moviesReducer }) => ({
  //   movies: moviesReducer.movies
  // }));

  useEffect(() => {
    // dispatch(fetchMovies(0, 10));
    const moviesFromBE = require('../stub.json');
    setMovies(moviesFromBE);
  }, []);

  function renderMovies() {
    return movies.map(movie => (
        <SingleMovie shouldElevateWhenHover elevation={7} key={movie.movieName} withRipple>
          <PosterContainer>
            <MoviePoster src={`data:image/png;base64,${movie.moviePoster}`}/>
          </PosterContainer>
          <p>{movie.title}</p>
          <p>{movie.year}</p>
        </SingleMovie>
      )
    );
  }

  return (
    <StyledMoviesContainer>
      <div>
        <Input label='Basic' helperText='Some helper text'/>
        <Input errorText='error text' label='With Error' />
        <Input helperText='helper text' placeholder='Placeholder' label='' />
        <Input value='Prefilled' />
      </div>
      {renderMovies()}
    </StyledMoviesContainer>
  );
};

export default MoviesContainer;
