import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { API_URL } from 'api/BaseAPI';
import { Loading, Rating } from 'components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { fetchMovies, getMoviesCount } from 'reducers/moviesReducer';
import withRipple from 'HOC/withRipple';
import ImageWorker from 'service-workers/imageLoader.worker';
import { DEFAULT_MOVIES_PER_PAGE } from 'config/MoviesConfig';
import MoviesPagination from '../MoviesPagination';
import {
  MovieNameText,
  MoviePoster,
  MoviesGrid,
  PosterContainer,
  SingleMovieLink,
  StyledMoviesContainer,
  Views,
  Year,
} from './styles';

const MoviesContainer = ({ history, location }) => {
  const dispatch = useDispatch();

  const {
    movies = [],
    moviesPerPage = DEFAULT_MOVIES_PER_PAGE,
    selectedPage = 1,
    isLoading, filters,
  } = useSelector(
    ({ moviesReducer }) => ({
      movies: moviesReducer.movies,
      selectedPage: moviesReducer.selectedPage,
      moviesPerPage: moviesReducer.moviesPerPage,
      filters: moviesReducer.filters,
      isLoading: moviesReducer.isLoading,
    }));

  const [prevPage, setPrevPage] = useState(selectedPage);
  const [posters, setPosters] = useState({});
  const [imageWorker, setImageWorker] = useState(null);

  const classNames = useMemo(
    () => `page-transition-${selectedPage > prevPage ? 'next' : 'prev'}`,
    [selectedPage]);

  const imagesReceived = useCallback(msg => {
    const { data: { id, imageData } } = msg;
    setPosters(p => ({ ...p, [id]: imageData }));
  }, [imageWorker, posters]);

  useEffect(() => {
    const worker = new ImageWorker();
    worker.onmessage = imagesReceived;
    setImageWorker(worker);
    return () => setImageWorker(null);
  }, []);

  useEffect(() => {
    if (movies.length === 0 || !imageWorker)
      return;

    movies.forEach(async movie => {
      imageWorker.postMessage({
        id: movie.id,
        url: `${API_URL}movies/poster/${movie.posterName}`,
      });
    });

  }, [movies, imageWorker]);


  useLayoutEffect(() => {
    if (selectedPage !== prevPage) {
      setPrevPage(selectedPage);
    }
    dispatch(fetchMovies(selectedPage, moviesPerPage));
    dispatch(getMoviesCount());
  }, [selectedPage, moviesPerPage, filters]);


  function imageLoaded (e) {
    // e.target.style.opacity = 1;
  }

  function clickedMovie (id) {
    history.push('/movie/' + id);
  }



  function renderMovies (moviesToRender) {
    const SingleMovie = withRipple(SingleMovieLink);
    return moviesToRender.map(movie => {
        let url = posters[movie.id];
        return (
          <SingleMovie
            size='s'
            key={movie.id}
            elevation={7}
            onClick={e => clickedMovie(movie.id, e)}
            shouldElevateWhenHover
          >
            <MovieNameText>
              {movie.movieName}
            </MovieNameText>
            <Year>{movie.year}</Year>
            <PosterContainer>
              <MoviePoster
                fadeIn={!!url}
                alt={url ? `Movie poster ${movie.movieName}` : ''}
                src={url}
                onLoad={imageLoaded}
              />
            </PosterContainer>
            <Rating rating={movie.movieRating} maxStars={5}/>
            <Views><small>Views:</small> {movie.movieViews}</Views>
          </SingleMovie>
        );
      },
    );
  }

  return (
    <StyledMoviesContainer
      moviesPerPage={moviesPerPage}
    >
      <MoviesPagination/>
      <TransitionGroup>
        <CSSTransition
          // nodeRef={ref}
          appear
          timeout={500}
          classNames={classNames}
          key={location.key}
        >
          <MoviesGrid key='gridKey'>
            {isLoading ? <Loading/> : renderMovies(movies)}
          </MoviesGrid>
        </CSSTransition>
      </TransitionGroup>
    </StyledMoviesContainer>
  );
};

export default withRouter(MoviesContainer);
