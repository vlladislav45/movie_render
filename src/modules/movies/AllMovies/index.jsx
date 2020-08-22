import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { CSSTransition, SwitchTransition, TransitionGroup } from 'react-transition-group';
import { useHistory, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { changeSelectedPage, fetchMovies, getMoviesCount, resetFilter } from 'reducers/moviesReducer';
import useDeviceDimensions from 'hooks/useDeviceDimensions';
import ImageWorker from 'service-workers/imageLoader.worker';
import { API_URL } from 'api/BaseAPI';
import { Button } from 'components/basic';
import MoviesPagination from './MoviesPagination';
import MoviesGrid from './MoviesGrid';
import { NoMovies, StyledMoviesContainer } from './styles';
import { Wrapper } from './MoviesGrid/styles';

const DEFAULT_THRESHOLD = 300;
const selector = createSelector(
  store => store.moviesReducer,
  ({ movies, selectedPage, moviesPerPage, isLoading, count }) => ({
    movies,
    selectedPage,
    moviesPerPage,
    isLoading,
    count,
  })
)
const AllMovies = () => {
  const dispatch = useDispatch();
  const isMounted = useRef(true);
  const prevPage = useRef(0);
  const containerRef = useRef();
  const store = useSelector(selector);
  const { width: screenWidth } = useDeviceDimensions();
  
  const {
    movies = [], moviesPerPage, selectedPage, isLoading, count
  } = store;
  const [gridRef, setGridRef] = useState();
  const [posters, setPosters] = useState({});
  const [imageWorker, setImageWorker] = useState(null);
  const swipeThreshold = useMemo(() => screenWidth / 2 || DEFAULT_THRESHOLD);
  
  
  const classNames = useMemo(
    () => `page-transition-${selectedPage > prevPage.current ? 'next' : 'prev'}`,
    [selectedPage]);
  
  const imagesReceived = useCallback(msg => {
    if (!isMounted.current) return;
    const { data: { id, imageData } } = msg;
    setPosters(p => ({ ...p, [id]: imageData }));
  }, [imageWorker]);
  
  // useEffect(() => {
  //   console.group('HOOK CHANGE');
  //   console.log(store);
  //   console.log(Object.keys(posters).length);
  //   console.groupEnd();
  // }, [store, posters, classNames, dispatch, imageWorker, imagesReceived])
  //
  // useEffect(() => {
  //   console.group('DID UPDATE');
  //   console.log();
  //   console.groupEnd();
  // })
  
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
  
  useLayoutEffect(() => {
    if (selectedPage !== prevPage.current) {
      prevPage.current = selectedPage;
    }
  }, [selectedPage]);
  
  useEffect(() => {
    dispatch(fetchMovies(selectedPage, moviesPerPage));
    dispatch(getMoviesCount());
  }, [])
  
  function dispatchResetFilter() {
    dispatch(resetFilter());
  }
  
  // swipe
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('touchstart', handleTouchStart, false);
    container.addEventListener('touchmove', handleTouchMove, false);
    container.addEventListener('touchend', handleTouchEnd, false);
    
    // const grid = document.querySelector('.movies_grid');
    // const gridAll = document.querySelectorAll('.movies_grid');
    let xStartTouch = null;
    let prevXDiff = 0;
    
    const grid = gridRef || document.querySelector('.movies_grid');

    
    function handleTouchStart(evt) {
      if (!evt.touches) return;
      const firstTouch = evt.touches[0];
      xStartTouch = firstTouch.clientX;
      prevXDiff = 0;
      grid.style.transition = 'none';
    }
    
    function handleTouchMove(evt) {
      if (!xStartTouch || !evt.touches) {
        return;
      }
      
      let xCurrentFingerLocation = evt.touches[0].clientX;
      let xDiff = xStartTouch - xCurrentFingerLocation;
      // xDiff positive -> LEFT
      // xDiff negative -> RIGHT
      prevXDiff = xDiff;
      
      const blur = Math.ceil(Math.abs(xDiff / 100));
      grid.style.transform = 'translateX(' + (-xDiff) + 'px)';
      grid.style.filter = 'blur(' + blur + 'px)';
    }
    
    function handleTouchEnd() {
      grid.style.filter = null;
      if (Math.abs(prevXDiff) >= swipeThreshold) {
        const nextPage = prevXDiff < 0
          ? Math.max(selectedPage - 1, 0)
          : Math.min(Math.ceil(count / moviesPerPage) - 1, selectedPage + 1)
        if (nextPage !== selectedPage) {
          grid.style.transform = 'translateX(' + (prevXDiff < 0 ? -200 : 200) + '%)!important';
          grid.style.opacity = 0;
          dispatch(changeSelectedPage(nextPage))
        } else {
          grid.style.transform = 'translateX(0)';
        }
      } else {
        grid.style.transform = 'translateX(0)';
      }
      grid.style.transition = null;
      
      prevXDiff = 0;
    }
    
    return () => {
      container.removeEventListener('touchstart', handleTouchStart, false);
      container.removeEventListener('touchmove', handleTouchMove, false);
      container.removeEventListener('touchend', handleTouchEnd, false);
    }
  }, [gridRef, selectedPage])
  
  
  return (
    <StyledMoviesContainer
      ref={containerRef}
      moviesPerPage={moviesPerPage}
      id='moviesContainer'
    >
      {!isLoading && movies.length === 0 &&
      <NoMovies>
        <p>No movies found</p>
        <br/>
        <Button type='text' text='Reset filters' onClick={dispatchResetFilter}/>
      </NoMovies>
      }
      <MoviesPagination/>
      <SwitchTransition>
        <CSSTransition
          timeout={250}
          classNames={classNames}
          key={selectedPage}
          onExit={() => {
            setTimeout(() => {
              setGridRef(document.querySelector('.movies_grid'));
            }, 300)
          }}
        >
          <MoviesGrid
            className='movies_grid'
            moviesPerPage={moviesPerPage}
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

/**
 page-transition-next-exit exit-active page-transition-next-enter-active page-transition-next-exit-active
 page-transition-next-exit page-transition-next-exit-active page-transition-next-enter-active
 page-transition-next-enter exit
 */