import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getMoviesCount, resetFilter } from 'reducers/moviesReducer';
import ImageWorker from 'service-workers/imageLoader.worker';
import { API_URL } from 'api/BaseAPI';
import { Button } from 'components/basic';
import MoviesPagination from './MoviesPagination';
import MoviesGrid from './MoviesGrid';
import { NoMovies, StyledMoviesContainer } from './styles';

const AllMovies = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  const {
    movies = [],
    moviesPerPage, selectedPage, isLoading, filters,
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
    
    movies.forEach(({ id, posterName }) => {
      imageWorker.postMessage({
        id: id,
        url: `${API_URL}movies/poster/${posterName}`,
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
  
  function dispatchResetFilter() {
    dispatch(resetFilter());
  }
  
  return (
    <StyledMoviesContainer
      moviesPerPage={moviesPerPage}
    >
      {!isLoading && movies.length === 0 &&
      <NoMovies>
        <p>No movies found</p>
        <br/>
        <Button type='text' text='Reset filters' onClick={dispatchResetFilter}/>
      </NoMovies>
      }
      <MoviesPagination/>
      <TransitionGroup>
        <CSSTransition
          timeout={500}
          classNames={classNames}
          key={location.key}
        >
          <MoviesGrid
            key={'grid_' + location.key}
            isLoading={isLoading}
            movies={movies}
            posters={posters}
          />
        </CSSTransition>
      </TransitionGroup>
    </StyledMoviesContainer>
  );
};

export default AllMovies;