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
 * TODO: Currently we get simmilar movies by the genres of the current movie
 *  I need to implement some algorithm on backend
 */
const SimilarMovies = ({ movieId, oneColumn }) => {
  const [similarMovies, setSimilarMovies ] = useState([]);
  useEffect(() => {
    MovieAPI.getSimilarMovies(movieId, 0, 10).then(res => {
      const { data } = res;
      setSimilarMovies(data);
    })
  }, [])
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
