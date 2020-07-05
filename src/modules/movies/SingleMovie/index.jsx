import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { API_URL } from 'api/BaseAPI';
import { fetchSingleMovie } from 'reducers/moviesReducer';
import { Loading } from 'components';
import { ReactComponent as BackArrow } from 'assets/icons/arrow_back.svg';
import MoreInfo from './MoreInfo';
import MovieSummary from './MovieSummary';
import {
  BackArrowWrapper,
  MovieTitle,
  MovieVideo,
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

  const {
    posterName, movieSummary, directorName,
    actorNames, movieYear, movieViews,
    movieRating, movieName,
  } = selectedMovie;

  useEffect(() => {
    dispatch(fetchSingleMovie(movieId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading || !posterName)
    return <Loading/>;
  return (
    <SingleMovieWrapper>
      <BackArrowWrapper
        color='primary'
        onClickCapture={() => history.goBack()}
        Icon={BackArrow}
      >
        {/*<BackArrow/>*/}
        BACK
      </BackArrowWrapper>
      <MovieVideo
        controls
        // poster={'https://placeimg.com/800/400/any&rnd='  + Math.random()}
        poster={BASE_POSTER_URL + posterName}
        onCanPlay={() => console.log('CAN PLAY')}
        onLoadStart={() => console.log('ONLOAD_START')}
      >
        <source src={`${API_URL}stream/mp4/Kenpachi`} type="video/mp4"/>
      </MovieVideo>
      <MovieTitle>
        <p>{movieName}</p>
      </MovieTitle>
      <MovieSummary summary={movieSummary} />
      <MoreInfo className='more-info' />
      {/*{renderMovieInfo()}*/}
    </SingleMovieWrapper>
  );
};

export default withRouter(SingleMovie);
