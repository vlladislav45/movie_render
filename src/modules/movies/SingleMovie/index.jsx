import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Loading, Rating } from 'components';
import { API_URL } from 'api/BaseAPI';
import { fetchSingleMovie } from 'reducers/moviesReducer';
import MovieSummary from './MovieSummary';
import { ReactComponent as BackArrow } from 'assets/icons/arrow_back.svg';
import {
  BackArrowWrapper, MovieActors, MovieDirector, MovieRating,
  MovieTitle,
  MovieVideo, MovieYear,
  SingleMovieWrapper,
} from './styles';

const BASE_POSTER_URL = API_URL + 'movies/single/hdPoster/';
const SingleMovie = ({ match: { params }, history }) => {
  const dispatch = useDispatch();
  const { movieId } = params;

  const { selectedMovie, isLoading } = useSelector(
    ({ moviesReducer: { selectedMovie } }) => ({
      selectedMovie: selectedMovie.movieInfo,
      isLoading: selectedMovie.isLoading,
    }));

  useEffect(() => {
    dispatch(fetchSingleMovie(movieId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  // console.log(selectedMovie)
  // console.log(isLoading)

  const {
    posterName, movieSummary, directorName,
    actorNames, movieYear, movieViews,
    movieRating, movieName,
  } = selectedMovie;



  if (isLoading || !posterName)
    return <Loading/>;

  return (
    <SingleMovieWrapper>
      <BackArrowWrapper
        color='primary'
        onClick={() => history.goBack()}
        Icon={BackArrow}
      >
        BACK
      </BackArrowWrapper>
      <MovieVideo
        id='movie-video'
        controls
        // poster={'https://placeimg.com/800/400/any&rnd=' + Math.random()}
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
        summary={movieSummary}
      />
      <MovieRating className='movieInfo'>
        <span className='movieInfoName'>Rating:</span>
        <Rating
          maxStars={5}
          rating={movieRating}
          color='onSurface'
        />
      </MovieRating>
      <MovieYear className='movieInfo'>
        <span className='movieInfoName'>Year:</span>
        <span> {movieYear}</span>
      </MovieYear>
      <MovieActors className='movieInfo'>
        <span className='movieInfoName'>Actors: </span>
        <>{actorNames.map(a => <span>a</span>)}</>
      </MovieActors>
      <MovieDirector className='movieInfo'>
        <span className='movieInfoName'>Director:</span>
        <span>{directorName}</span>
      </MovieDirector>
    </SingleMovieWrapper>
  );
};

export default withRouter(SingleMovie);
