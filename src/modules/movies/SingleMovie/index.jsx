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
import { ReactComponent as BackArrow } from 'assets/icons/arrow_back.svg';
import RatingSection from './Rating';
import SimilarMovies from './SimilarMovies';
import {
  BackArrowWrapper,
  MovieTitle,
  SingleMovieWrapper,
  MoreInfoGrid, MovieVideo,
} from './styles';

const MOVIE_RATIO = 16 / 10;
const BASE_POSTER_URL = API_URL + 'movies/single/hdPoster/';
const SingleMovie = ({ match: { params }, history }) => {
  const dispatch = useDispatch();
  const { movieId } = params;

  const { vmax: screenWidth } = useDeviceDimensions();
  const [videoRef, setVideoRef] = useState();
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
    movieRating, movieName, movieGenres,
  } = selectedMovie;

  useEffect(() => {
    setPrevGenres(previousGenres);
    dispatch(updateFilter({ genres: movieGenres }));
    return () => dispatch(updateFilter({ genres: prevGenres }));
  }, [movieGenres]);

  if (!posterName)
    return null;

  return (
    <SingleMovieWrapper>
      {isLoading && <Loading/>}
      <BackArrowWrapper
        color='primary'
        onClick={() => history.goBack()}
        Icon={BackArrow}
      >
        BACK
      </BackArrowWrapper>
      <MovieVideo
        width={screenWidth / 3}
        height={(screenWidth / 3) / MOVIE_RATIO}
        ref={ref => setVideoRef(ref)}
        controls
        poster={BASE_POSTER_URL + posterName}
        // onCanPlay={() => forceRender(true)}
        // onLoadStart={() => console.log('ONLOAD_START')}
      >
        <source src={`${API_URL}stream/mp4/Kenpachi`} type="video/mp4"/>
      </MovieVideo>
      <MovieTitle>
        <p>{movieName}</p>
      </MovieTitle>
      <MovieSummary
        videoRef={videoRef}
        summary={movieSummary}
        movieId={movieId}
      />
      <MoreInfoGrid>
        <RatingSection
          movieName={movieName}
          movieId={movieId}
        />
        <span className='movieInfo views'>
          <span>{movieViews}</span>
        </span>
        <span className='movieInfoName views'>Views</span>
        <span className='movieInfoName year'>Year:</span>
        <span className='movieInfo year'>
          <span> {movieYear}</span>
        </span>
        <span className='movieInfoName director'>Director:</span>
        <span className='movieInfo director'>
          <span>{directorName}</span>
        </span>
        <Actors actors={actorNames}/>
      </MoreInfoGrid>
      <SimilarMovies/>
    </SingleMovieWrapper>
  );
};

export default withRouter(SingleMovie);
