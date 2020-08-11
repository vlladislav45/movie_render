import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  MoreMoviesTitle,
  MovieLink, MovieName,
  MoviePoster, Movies,
  SimilarMoviesContainer,
} from './styles';
import MovieAPI from '../../../../api/MovieAPI';
import { API_URL } from '../../../../api/BaseAPI';

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
const SimilarMovies = ({ movieId }) => {
  // const stubImages = useMemo(() => STUB_MOVIES.map(() => `https://placeimg.com/400/235/any&rnd=${Math.random()}`), []);
  const [similarMovies, setSimilarMovies ] = useState([]);
  useEffect(() => {
    MovieAPI.getSimilarMovies(movieId, 0, 10).then(res => {
      const { data } = res;
      console.log(data)
      setSimilarMovies(data);
    })
  }, [])
  return (
    <SimilarMoviesContainer
    >
      <MoreMoviesTitle>
        Similar Movies:
      </MoreMoviesTitle>
      <Movies>
        {similarMovies.map(({ id, movieName, posterName }) => (
          <MovieLink key={id}>
            <MovieName>{movieName}</MovieName>
            <MoviePoster
              src={`${API_URL}movies/poster/${posterName}`}
              alt={movieName}
            />
          </MovieLink>
        ))}
        {/*{STUB_MOVIES.map((m, i) => (*/}
        {/*  <MovieLink key={i}>*/}
        {/*    <MovieName>{m}</MovieName>*/}
        {/*    /!*<MoviePoster*!/*/}
        {/*    /!*  src={stubImages[i]}/>*!/*/}
        {/*  </MovieLink>*/}
        {/*))}*/}
      </Movies>
    </SimilarMoviesContainer>
  );
};

export default SimilarMovies;
