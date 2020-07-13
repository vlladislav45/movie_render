import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Loading, Rating } from 'components';
import { API_URL } from 'api/BaseAPI';
import { fetchSingleMovie, updateFilter } from 'reducers/moviesReducer';
import useDeviceDimensions from 'hooks/useDeviceDimensions';
import Actors from './Actors';
import MovieSummary from './MovieSummary';
import { ReactComponent as BackArrow } from 'assets/icons/arrow_back.svg';
import SimilarMovies from './SimilarMovies';
import {
  BackArrowWrapper, MovieActors, MovieDirector, MovieRating,
  MovieTitle,
  MovieVideo, MovieYear,
  SingleMovieWrapper,
  MovieViews,
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

  function rateMovie (rate) {
    // TODO: Rate the movie with this rating
  }

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
      />
      <MovieRating className='movieInfo'>
        <span className='movieInfoName'>Rating:</span>
        <Rating
          rateable
          onRate={rateMovie}
          maxStars={5}
          rating={movieRating}
          color='onSurface'
        />
      </MovieRating>
      <MovieViews className='movieInfo'>
        <span className='movieInfoName'>Views</span>
        <span>{movieViews}</span>
      </MovieViews>
      <MovieYear className='movieInfo'>
        <span className='movieInfoName'>Year:</span>
        <span> {movieYear}</span>
      </MovieYear>
      <Actors actors={actorNames}/>
      <MovieDirector className='movieInfo'>
        <span className='movieInfoName'>Director:</span>
        <span>{directorName}</span>
      </MovieDirector>
      <SimilarMovies />
    </SingleMovieWrapper>
  );
};

export default withRouter(SingleMovie);
