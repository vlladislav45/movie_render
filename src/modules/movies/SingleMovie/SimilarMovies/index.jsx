import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  MoreMoviesTitle,
  MovieLink, MovieName,
  MoviePoster, Movies,
  SimilarMoviesContainer,
} from './styles';

/**
 * List movies that are like the selected movie
 * maybe by actors/director or genres
 * TODO: Implement some algorithm on backend
 * TODO: Get the movies from backend (
 */
const STUB_MOVIES = [
  'Ice age',
  'Tango & Cash',
  'Big tits at school',
  'Men of Israel',
  'Fight club',
  'I origins',
  'I Robot',
  'Sinister',
];
const SimilarMovies = props => {
  const stubImages = useMemo(() => STUB_MOVIES.map(() => `https://placeimg.com/400/235/any&rnd=${Math.random()}`), []);
  return (
    <SimilarMoviesContainer
    >
      <MoreMoviesTitle>
        Similar Movies:
      </MoreMoviesTitle>
      <Movies>
        {STUB_MOVIES.map((m, i) => (
          <MovieLink key={i}>
            <MovieName>{m}</MovieName>
            {/*<MoviePoster*/}
            {/*  src={stubImages[i]}/>*/}
          </MovieLink>
        ))}
      </Movies>
    </SimilarMoviesContainer>
  );
};

export default SimilarMovies;
