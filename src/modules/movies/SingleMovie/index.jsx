import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Loading } from 'components';
import { API_URL } from 'api/BaseAPI';
import { clearSingleMovie, fetchSingleMovie, updateFilter } from 'reducers/moviesReducer';
import useDeviceDimensions from 'hooks/useDeviceDimensions';
import { L, lessThen } from 'utils/mediaUtils';
import MovieSummary from './MovieSummary';
import RatingSection from './RatingSection';
import SimilarMovies from './SimilarMovies';
import MovieGenres from './MovieGenres';
import MovieCast from './MovieCast';
import { MovieTitle, MovieVideoContainer, SingleMovieWrapper, } from './styles';

const MOVIE_RATIO = 16 / 10;
const BASE_POSTER_URL = API_URL + 'movies/single/hdPoster/';
const SingleMovie = ({ match: { params }, history }) => {
  const dispatch = useDispatch();
  // Ref of the previous filtered genres, to restore after unmunting
  const prevGenres = React.useRef({ current: [] });
  const { movieId } = params;
  
  const { width: screenWidth, device } = useDeviceDimensions('SingleMovie');
  const isSingleColumn = useMemo(() => lessThen(device, L), [screenWidth]);
  
  const { selectedMovie, previousGenres, isLoading } = useSelector(
    ({ moviesReducer: { selectedMovie, filters: { genres } } }) => ({
      selectedMovie: selectedMovie.movieInfo,
      previousGenres: genres,
      isLoading: selectedMovie.isLoading,
    }));
  
  useEffect(() => {
    prevGenres.current = previousGenres;
    dispatch(updateFilter({ genres: movieGenres }));
    return () => dispatch(updateFilter({ genres: prevGenres.current }));
  }, []);
  
  useEffect(() => {
    dispatch(clearSingleMovie())
    dispatch(fetchSingleMovie(movieId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);
  
  const {
    posterName, movieSummary, directorName,
    actorNames = [], movieYear, movieViews,
    movieName, movieGenres,
  } = selectedMovie;
  
  
  return (
    <>
      <Loading isLoading={!screenWidth || !posterName || isLoading}/>
      <SingleMovieWrapper
        fadeIn={!isLoading}
        $oneColumn={isSingleColumn}
      >
        {(!!screenWidth && !!posterName && !isLoading) && (
          <>
            <MovieTitle $oneColumn={isSingleColumn}>
              <h2>{movieName}</h2>
            </MovieTitle>
            <MovieVideoContainer
              $oneColumn={isSingleColumn}
            >
              <video
                width={isSingleColumn ? screenWidth - 30 : screenWidth / 1.5}
                height={isSingleColumn ? (screenWidth - 30) / MOVIE_RATIO : (screenWidth / 1.5) / MOVIE_RATIO}
                controls
                poster={BASE_POSTER_URL + posterName}
                // onCanPlay={() => forceRender(true)}
                // onLoadStart={() => console.log('ONLOAD_START')}
              >
                <source src={`${API_URL}stream/mp4/Kenpachi`} type="video/mp4"/>
              </video>
            </MovieVideoContainer>
            <MovieSummary
              oneColumn={isSingleColumn}
              summary={movieSummary}
            />
            <RatingSection
              movieId={movieId}
              movieName={movieName}
              oneColumn={isSingleColumn}
            />
            <MovieGenres
              genres={movieGenres}
              oneColumn={isSingleColumn}
            />
            <MovieCast
              oneColumn={isSingleColumn}
              actors={actorNames}
              director={directorName}
            />
            <SimilarMovies
              oneColumn={isSingleColumn}
              movieId={movieId}
            />
          </>
        )
        }
      </SingleMovieWrapper>
    </>
  );
};

export default withRouter(SingleMovie);
