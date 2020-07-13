import React from 'react';
import { useSelector } from 'react-redux';
import {
  MoreMoviesTitle,
  MovieLink,
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
  'Fight club'];
const SimilarMovies = props => {

  return (
    <SimilarMoviesContainer
    >
      <MoreMoviesTitle>
        Similar Movies:
      </MoreMoviesTitle>
      <Movies>
        {STUB_MOVIES.map((m, i) => (
          <MovieLink key={i}>
            {m}
            <MoviePoster
              src={`https://placeimg.com/400/235/any&rnd=${Math.random()}`}/>
          </MovieLink>
        ))}
      </Movies>
    </SimilarMoviesContainer>
  );
};

export default SimilarMovies;
