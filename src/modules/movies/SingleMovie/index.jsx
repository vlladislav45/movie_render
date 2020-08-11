import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Loading, Rating } from 'components';
import { API_URL } from 'api/BaseAPI';
import { fetchSingleMovie, updateFilter } from 'reducers/moviesReducer';
import useDeviceDimensions from 'hooks/useDeviceDimensions';
import { Button, Input } from '../../../components/basic';
import { promptUser } from '../../../reducers/uiReducer';
import Actors from './Actors';
import MovieSummary from './MovieSummary';
import RatingSection from './RatingSection';
import SimilarMovies from './SimilarMovies';
import {
  MovieTitle,
  SingleMovieWrapper,
  MovieVideoContainer,
} from './styles';
import MovieGenres from './MovieGenres';
import MovieCast from './MovieCast';

const MOVIE_RATIO = 16 / 10;
const BASE_POSTER_URL = API_URL + 'movies/single/hdPoster/';
const SingleMovie = ({ match: { params }, history }) => {
  const dispatch = useDispatch();
  const { movieId } = params;
  
  const { width: screenWidth } = useDeviceDimensions();
  const [prevGenres, setPrevGenres] = useState();
  
  const { selectedMovie, previousGenres, isLoading } = useSelector(
    ({ moviesReducer: { selectedMovie, filters: { genres } } }) => ({
      selectedMovie: selectedMovie.movieInfo,
      previousGenres: genres,
      isLoading: selectedMovie.isLoading,
    }));
  
  useEffect(() => {
    dispatch(fetchSingleMovie(movieId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);
  
  const {
    posterName, movieSummary, directorName,
    actorNames = [], movieYear, movieViews,
    movieName, movieGenres,
  } = selectedMovie;
  
  useEffect(() => {
    setPrevGenres(previousGenres);
    dispatch(updateFilter({ genres: movieGenres }));
    return () => dispatch(updateFilter({ genres: prevGenres }));
  }, [movieGenres]);
  
  if (!posterName || !screenWidth)
    return null;
  
  return (
    <SingleMovieWrapper
      fadeIn={!isLoading}
    >
      <Loading isLoading={isLoading}/>
      <MovieTitle>
        <p>{movieName}</p>
      </MovieTitle>
      <MovieVideoContainer>
        <video
          width={screenWidth / 1.5}
          height={(screenWidth / 1.5) / MOVIE_RATIO}
          controls
          poster={BASE_POSTER_URL + posterName}
          // onCanPlay={() => forceRender(true)}
          // onLoadStart={() => console.log('ONLOAD_START')}
        >
          <source src={`${API_URL}stream/mp4/Kenpachi`} type="video/mp4"/>
        </video>
      </MovieVideoContainer>
      <MovieSummary
        summary={movieSummary}
      />
      <RatingSection
        movieId={movieId}
        movieName={movieName}
      />
      <MovieGenres genres={movieGenres} />
      <MovieCast
        actors={actorNames}
        director={directorName}
      />
      {/*<MoreInfoGrid>*/}
      {/*  <RatingSection*/}
      {/*    movieName={movieName}*/}
      {/*    movieId={movieId}*/}
      {/*  />*/}
      {/*  <span className='movieInfo views'>*/}
      {/*    <span>{movieViews}</span>*/}
      {/*  </span>*/}
      {/*  <span className='movieInfoName views'>Views</span>*/}
      {/*  <span className='movieInfoName year'>Year:</span>*/}
      {/*  <span className='movieInfo year'>*/}
      {/*    <span> {movieYear}</span>*/}
      {/*  </span>*/}
      {/*  <span className='movieInfoName director'>Director:</span>*/}
      {/*  <span className='movieInfo director'>*/}
      {/*    <span>{directorName}</span>*/}
      {/*  </span>*/}
      {/*  <Actors actors={actorNames}/>*/}
      {/*</MoreInfoGrid>*/}
      <SimilarMovies
        movieId={movieId}
      />
    </SingleMovieWrapper>
  );
};

export default withRouter(SingleMovie);
