import React, {
  createRef,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
  useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { calcOffset, getLastInvisible, isVisible } from 'utils/DomUtils';
import useDeviceDimensions from 'hooks/useDeviceDimensions';
import { fetchGenres, updateFilter } from 'reducers/moviesReducer';
import { transitionDurations } from 'config/animationConstants';
import browserHistory from 'utils/browserHistory';
import SingleGenre from './SingleGenre';
import {
  Arrow,
  Carousel,
  GenresContainer,
  GenresList,
} from './styles';


// If the carousel is sliding, user should not be able to initiate another slide
// because offset will be calculated wrong
let isSliding = false;
const { smallArea } = transitionDurations;

const selector = createSelector(
  state => state.moviesReducer,
  state => state.auth,
  ({ filters, genresLoading, genres }, { isLoading } ) => {
    return {
      selectedGenres: filters.genres,
      isLoading: genresLoading || isLoading,
      genres: genres,
    }
  },
)

const Genres = ({ onFinishLoading, className, ...rest }) => {
  const dispatch = useDispatch();
  const {
    genres = [],
    selectedGenres = [],
    isLoading = false,
  } = useSelector(selector);
  const leftArrowRef = useRef();
  const rightArrowRef = useRef();
  
  useEffect(() => {
    console.group('STORE UPDATE');
    console.log(selectedGenres);
    console.groupEnd();
  }, [genres, selectedGenres, isLoading])
  
  // Object with keys the genre name and value its ref
  const [genresRef, setGenresRef] = useState(null);
  // If genres overflow their container, render arrows
  const [isOverflow, setIsOverflow] = useState(null);
  
  // current arrow offset
  const [offset, setOffset] = useState(0);
  // is the left or right arrow disabled
  const [leftEnd, setLeftEnd] = useState(true);
  const [rightEnd, setRightEnd] = useState(false);
  
  const { width: screenWidth } = useDeviceDimensions('Genres');
  
  useEffect(() => {
    dispatch(fetchGenres());
  }, []);
  
  useEffect(() => {
    const refs = {};
    genres.forEach(genre => refs[genre['movieGenreName']] = createRef());
    setGenresRef(refs);
  }, [genres.length]);
  
  useEffect(() => {
    if (isOverflow !== null || !isLoading)
      onFinishLoading();
    
    setOffset(0);
    setLeftEnd(true);
    setRightEnd(false);
  }, [isOverflow, isLoading]);
  
  useLayoutEffect(checkIfOverflows, [genresRef, screenWidth]);
  
  function checkIfOverflows() {
    // Refs still not attached
    if (genresRef === null || genresRef[genres[0]]?.current === null)
      return;
    
    const GENRE_MARGIN = 10;
    const width = Object.values(genresRef).reduce((initial, ref) => (initial += ref.current.clientWidth + GENRE_MARGIN), 0);
    
    
    if (width > screenWidth)
      setIsOverflow(true);
    else
      setIsOverflow(false)
  }
  
  /**
   * Calculate and change the {@link offset} of the carousel
   * based on the direction
   * @param direction oneOf([ 'left', 'right' ])
   */
  const slide = useCallback(direction => {
    const isLeft = direction === 'left';
    
    // we slided, so we are not at the end
    isLeft ? setRightEnd(prev => false) : setLeftEnd(prev => false);
    
    let genresRefsArray = Object.values(genresRef);
    if (!isLeft) genresRefsArray = genresRefsArray.reverse();
    
    const firstHidden = getLastInvisible(genresRefsArray);
    
    // The first hidden is the first element, now we slide it, next time we are the the end
    if (firstHidden === genresRefsArray[0].current) {
      isLeft ? setLeftEnd(prev => true) : setRightEnd(prev => true);
    }
    
    const slideArrow = isLeft ? leftArrowRef.current : rightArrowRef.current;
    const offsetToBeVisible = calcOffset(firstHidden, slideArrow, isLeft);
    
    const newOffset = isLeft
      ? Math.min(0, offset + offsetToBeVisible)
      : offset - offsetToBeVisible;
    
    setOffset(offset => newOffset);
  },[genresRef, offset]);
  
  const slideLeft = useCallback(() => {
    // Do nothing if we are at the left end or sliding
    if (leftEnd || isSliding) return;
    
    slide('left');
    isSliding = true;
    setTimeout(() => isSliding = false, smallArea);
  }, [slide])
  
  const slideRight = useCallback(() => {
    // Do nothing if we are at the right end or sliding
    if (rightEnd || isSliding) return;
    
    slide('right');
    isSliding = true;
    setTimeout(() => isSliding = false, smallArea);
  }, [slide])
  
  // Add/remove the genre from the filter
  const genreClicked = useCallback((genre) => {
    const { movieGenreName } = genre;
    const genreRef = genresRef[movieGenreName];
    
    // If the genre is not 100% visible, slide
    if (!isVisible(genreRef.current, 'left'))
      slideLeft();
    else if (!isVisible(genreRef.current, 'right'))
      slideRight();
    
    let newGenres;
    if (selectedGenres.includes(movieGenreName))
      newGenres = selectedGenres.filter(g => g !== movieGenreName);
    else
      newGenres = selectedGenres.concat(movieGenreName);
    
    dispatch(updateFilter({ genres: newGenres }));
  }, [genresRef, selectedGenres])
  
  const renderGenres = useCallback(() => {
    return genres.map(genre => {
      const { genreId: id, movieGenreName: name } = genre;
      const isDisabled = browserHistory.location.pathname !== '/';

      return (
        <SingleGenre
          genre={genre}
          onClick={genreClicked}
          key={id}
          ref={genresRef[name]}
          className='genre'
          isDisabled={isDisabled}
          isActive={selectedGenres.includes(name)}
        />
        );
    });
  }, [genres, genresRef, selectedGenres])
  
  const MemoizedLeftArrow = useMemo(() => isOverflow ? (<Arrow
    flipped={'true'}
    ref={leftArrowRef}
    disabled={leftEnd}
    onClickCapture={slideLeft}
  />) : null, [leftArrowRef, leftEnd, slideLeft, isOverflow])
  
  const MemoizedRightArrow = useMemo(() => isOverflow ? (<Arrow
    ref={rightArrowRef}
    disabled={rightEnd}
    onClickCapture={slideRight}
  />) : null, [leftArrowRef, leftEnd, slideLeft, isOverflow])
  
  const MemoizedGenresCarousel = useMemo(() => (
    <Carousel>
      <GenresList
        offset={offset}
      >
        {renderGenres()}
      </GenresList>
    </Carousel>
  ), [offset, genres, genresRef, selectedGenres])
  
  return (
    <GenresContainer
      className={className}
      isOverflow={isOverflow}
      isLoading={isOverflow === null || isLoading}  // if overflow is not yet calculated or if genres are loading
    >
      {MemoizedLeftArrow}
      {MemoizedGenresCarousel}
      {MemoizedRightArrow}
    </GenresContainer>
  );
};

export default React.memo(Genres);