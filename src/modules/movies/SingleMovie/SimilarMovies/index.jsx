import React, { useEffect, useMemo, useRef, useState } from 'react';
import MovieAPI from 'api/MovieAPI';
import { API_URL } from 'api/BaseAPI';
import useFakePromise from 'hooks/useFakePromise';
import {
  MoreMoviesTitle,
  MovieLink, MovieName,
  MoviePoster, Movies,
  SimilarMoviesContainer,
} from './styles';

function promiseFunc(resolve, reject) {
  return resolve;
}

/**
 * TODO: Currently we get similar movies by the genres of the current movie
 *  I need to implement some algorithm on backend
 */
const SimilarMovies = ({ movieId, oneColumn }) => {
  const fakePromise = useFakePromise();
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    if (!fakePromise)
      return;
    
    const promiseWithEffect = () => MovieAPI.getSimilarMovies(movieId, 0, 10)
    Promise.race([fakePromise, promiseWithEffect()])
    .then(res => {
      if (!res) return;
      
      const { data } = res;
      setSimilarMovies(data);
    })
  }, [movieId, fakePromise])
  
  return (
    <SimilarMoviesContainer
      $oneColumn={oneColumn}
    >
      <MoreMoviesTitle>
        Similar Movies:
      </MoreMoviesTitle>
      <Movies>
        {similarMovies.map(({ id, movieName, posterName }) => (
          <MovieLink key={id} to={`/movie/${id}`}>
            <MovieName>{movieName}</MovieName>
            <MoviePoster
              src={`${API_URL}movies/poster/${posterName}`}
              alt={movieName}
            />
          </MovieLink>
        ))}
      </Movies>
    </SimilarMoviesContainer>
  );
};

export default SimilarMovies;
