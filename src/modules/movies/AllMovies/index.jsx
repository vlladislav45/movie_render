import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { CSSTransition, SwitchTransition, TransitionGroup } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import moviesReducer, { changePage, fetchMovies, getMoviesCount, resetFilter } from 'reducers/moviesReducer';
import useDeviceDimensions from 'hooks/useDeviceDimensions';
import ImageWorker from 'service-workers/imageLoader.worker';
import { API_URL } from 'api/BaseAPI';
import { Button } from 'components/basic';
import { transitionFunctions } from 'config/animationConstants';
import { addHorizontalDrag } from 'utils/DomUtils';
import MoviesPagination from './MoviesPagination';
import MoviesGrid from './MoviesGrid';
import { NoMovies, StyledMoviesContainer } from './styles';
import { Wrapper } from './MoviesGrid/styles';

const DEFAULT_THRESHOLD = 300;
const selector = createSelector(
  store => store.moviesReducer.movies,
  store => store.moviesReducer.isLoading,
  (movies, isLoading ) => ({
    movies,
    isLoading,
  })
)
const AllMovies = () => {
  const dispatch = useDispatch();
  // Static fields
  // Is mounted
  const isMounted = useRef(true);
  // Needed to calculate the swipe distance
  const prevDragX = useRef(0);
  // Ref to the MoviesGrid component (attached manually in useEffect)
  const gridRef = useRef();
  // Flag isDragging
  const isDragging = useRef();
  const containerRef = useRef();
  
  const { width: screenWidth } = useDeviceDimensions();
  const { movies = [], isLoading } = useSelector(selector);
  
  const [posters, setPosters] = useState({});
  const [imageWorker, setImageWorker] = useState(null);
  
  const [classNames, setClassNames] = useState('page-transition-prev');
  const [transitionKey, setTransitionKey] = useState('');
  const pageChanged = useCallback((current, previous) => {
    setClassNames(() => `page-transition-${current > previous ? 'next' : 'prev'}`);
    setTransitionKey(Math.random());
  }, [])
  
  const imagesReceived = useCallback(msg => {
    if (!isMounted.current) return;
    const { data: { id, imageData } } = msg;
    setPosters(p => ({ ...p, [id]: imageData }));
  }, [imageWorker]);
  
  useEffect(() => {
    const worker = new ImageWorker();
    isMounted.current = true;
    worker.onmessage = imagesReceived;
    setImageWorker(worker);
    return () => {
      isMounted.current = false;
      setImageWorker(null);
    }
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
  
  const swipeThreshold = useMemo(() => screenWidth / 2 || DEFAULT_THRESHOLD, [screenWidth]);

  const onDragStart = useCallback(e => {
    if (e.target.closest('.pagination') !== null) {
      // Ignore if we click pagination
      isDragging.current = false;
      return;
    }

    isDragging.current = true;
    gridRef.current = document.querySelector('.movies_grid');
    prevDragX.current = 0;
    gridRef.current.style.transition = 'none';
  }, [])
  
  const onDrag = useCallback((e, xDiff) => {
    if (!isDragging.current) return;
    prevDragX.current = xDiff;
    if (Math.abs(xDiff) > swipeThreshold) return;
    gridRef.current.style.transform = 'translateX(' + (-xDiff) + 'px)';
    gridRef.current.style.filter = 'blur(' + Math.abs(xDiff / 100) + 'px)';
  }, [swipeThreshold])
  
  const onDragEnd = useCallback(() => {
    if (!isDragging.current) return;
    const grid = gridRef.current;
    const dragAmount = prevDragX.current;
    
    grid.style.filter = null;
    const transitionDuration = 200;
    grid.style.transition = `all ${transitionDuration}ms ${transitionFunctions.standardEasing}`;
    
    if (Math.abs(dragAmount) >= swipeThreshold) {
      dispatch(changePage(dragAmount < 0 ? 'prev' : 'next')).then(isSamePage => {
        if (isSamePage) {
          grid.style.transform = 'translateX(0)';
          setTimeout(() => grid.style.transition = null, transitionDuration);
        } else {
          grid.style.opacity = 0;
          grid.style.transform = `translateX(${dragAmount > 0 ? '-120%' : '120%'})`;
        }
      });
    } else {
      grid.style.transform = 'translateX(0)';
      setTimeout(() => grid.style.transition = null, transitionDuration)
    }
    prevDragX.current = 0;
  }, [swipeThreshold])
  
  useEffect(() => {
    if (!containerRef.current) return;
    const drag = addHorizontalDrag(containerRef.current, onDragStart, onDrag, onDragEnd);
    return () => drag.dispose()
  }, [containerRef, onDrag, onDragEnd])
  
  function dispatchResetFilter() {
    dispatch(resetFilter());
  }
  
  return (
    <StyledMoviesContainer
      ref={containerRef}
    >
      {!isLoading && movies.length === 0 &&
      <NoMovies>
        <p>No movies found</p>
        <br/>
        <Button type='text' text='Reset filters' onClick={dispatchResetFilter}/>
      </NoMovies>
      }
      <MoviesPagination className='pagination' onPageChange={pageChanged} />
      <SwitchTransition>
        <CSSTransition
          timeout={200}
          classNames={classNames}
          key={transitionKey}
        >
          <MoviesGrid
            className='movies_grid'
            isLoading={isLoading}
            movies={movies}
            posters={posters}
          />
        </CSSTransition>
      </SwitchTransition>
    </StyledMoviesContainer>
  );
};

export default AllMovies;