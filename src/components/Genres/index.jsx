import React, {
  createRef,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from 'components';
import { calcOffset, getLastInvisible, isVisible } from 'utils/DomUtils';
import useDeviceDimensions from 'hooks/useDeviceDimensions';
import { fetchGenres, updateFilter } from 'reducers/moviesReducer';
import { transitionDurations } from 'config/animationConstants';
import browserHistory from 'utils/browserHistory';

import {
  Arrow,
  Carousel,
  GenresContainer,
  GenresList,
  SingleGenre,
} from './styles';

// If the carousel is sliding, user should not be able to initiate another slide
// because offset will be calculated wrong
let isSliding = false;
const { smallArea } = transitionDurations;

const Genres = ({ onFinishLoading, ...props }) => {
  const dispatch = useDispatch();
  const {
    genres = [],
    selectedGenres = [],
    isLoading = false,
  } = useSelector(
    ({ moviesReducer: { filters, genres, genresLoading }, auth: { isLoading } }) => ({
      selectedGenres: filters.genres,
      genres,
      isLoading: genresLoading || isLoading, // If auth is loading so width can be calculated properly
    }));
  const leftArrowRef = useRef();
  const rightArrowRef = useRef();
  
  // Object with keys the genre name and value its ref
  const [genresRef, setGenresRef] = useState(null);
  // If genres overflow their container, render arrows
  const [isOverflow, setIsOverflow] = useState(null);
  
  // current arrow offset
  const [offset, setOffset] = useState(0);
  // is the left or right arrow disabled
  const [leftEnd, setLeftEnd] = useState(true);
  const [rightEnd, setRightEnd] = useState(false);
  
  const { width: screenWidth } = useDeviceDimensions();
  
  useEffect(() => {
    dispatch(fetchGenres());
  }, []);
  
  useEffect(() => {
    const refs = {};
    genres.forEach(genre => refs[genre['movieGenreName']] = createRef());
    setGenresRef(refs);
  }, [genres.length]);
  
  useEffect(() => {
    setOffset(0);
    setLeftEnd(true);
    setRightEnd(false);
  }, [isOverflow]);
  
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
  
  function slideLeft() {
    // Do nothing if we are at the left end or sliding
    if (leftEnd || isSliding) return;
    
    slide('left');
    isSliding = true;
    setTimeout(() => isSliding = false, smallArea);
  }
  
  function slideRight() {
    // Do nothing if we are at the right end or sliding
    if (rightEnd || isSliding) return;
    
    slide('right');
    isSliding = true;
    setTimeout(() => isSliding = false, smallArea);
  }
  
  /**
   * Calculate and change the {@Link offset} of the carousel
   * based on the direction
   * @param direction oneOf([ 'left', 'right' ])
   */
  const slide = direction => {
    const isLeft = direction === 'left';
    
    // we slided, so we are not at the end
    isLeft ? setRightEnd(false) : setLeftEnd(false);
    
    let genresRefsArray = Object.values(genresRef);
    if (!isLeft) genresRefsArray = genresRefsArray.reverse();
    
    const firstHidden = getLastInvisible(genresRefsArray);

    // The first hidden is the first element, now we slide it, next time we are the the end
    if (firstHidden === genresRefsArray[0].current) {
      isLeft ? setLeftEnd(true) : setRightEnd(true);
    }
    
    const slideArrow = isLeft ? leftArrowRef.current : rightArrowRef.current;
    const offsetToBeVisible = calcOffset(firstHidden, slideArrow, isLeft);

    const newOffset = isLeft
      ? Math.min(0, offset + offsetToBeVisible)
      : offset - offsetToBeVisible;
    
    setOffset(newOffset);
  };
  
  // Add/remove the genre from the filter
  function genreClicked(genre) {
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
  }
  
  function renderGenres() {
    return genres.map(genre => {
      const { genreId: id, movieGenreName: name } = genre;
      const isDisabled = browserHistory.location.pathname !== '/';
      return (
        <SingleGenre
          id={id}
          key={id}
          ref={genresRef[name]}
          className='genre'
          isDisabled={isDisabled}
          isActive={selectedGenres.includes(name)}
          onClick={() => isDisabled ? {} : genreClicked(genre)}
        >
          <p>
            {name}
          </p>
        </SingleGenre>);
    });
  }
  
  useEffect(() => {
    if (!(isOverflow === null || isLoading))
      onFinishLoading();
  }, [isOverflow, isLoading])
  
  //TODO: rework loading logic
  return (
    <GenresContainer
      {...props}
      isOverflow={isOverflow}
      isLoading={isOverflow === null || isLoading}  // if overflow is not yet calculated or if genres are loading
    >
      {isOverflow &&
      <Arrow
        flipped={'true'}
        ref={leftArrowRef}
        disabled={leftEnd}
        onClick={slideLeft}
      />
      }
      <Carousel>
        <GenresList
          offset={offset}
        >
          {renderGenres()}
        </GenresList>
      </Carousel>
      {isOverflow &&
      <Arrow
        ref={rightArrowRef}
        disabled={rightEnd}
        onClickCapture={slideRight}
      />
      }
    </GenresContainer>
  );
};

export default Genres;