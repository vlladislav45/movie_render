import React, {
  createRef,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calcOffset, getLastInvisible, isVisible } from 'utils/DomUtils';
import useDeviceDimensions from 'hooks/useDeviceDimensions';
import { fetchGenres, updateFilter } from 'reducers/moviesReducer';
import {
  Arrow,
  Carousel,
  GenresContainer,
  GenresList,
  SingleGenre,
  SLIDE_DURATION,
} from './styles';

// If the carousel is sliding, user should not be able to initiate another slide
// because offset will be calculated wrong
let isSliding = false;

const Genres = props => {
  const dispatch = useDispatch();
  const { genres = [], selectedGenres = [] } = useSelector(
    ({ moviesReducer: { filters, genres } }) => ({
      selectedGenres: filters.genres,
      genres,
    }));
  const leftArrowRef = useRef();
  const rightArrowRef = useRef();

  // Array with refs for all the genres
  const [genresRef, setGenresRef] = useState({});
  const [isOverflow, setIsOverflow] = useState(false);

  // const [genres, setGenres] = useState([]);
  const [offset, setOffset] = useState(0);
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
  }, [genres]);

  useEffect(() => {
    setOffset(0);
    setLeftEnd(true);
    setRightEnd(false);
  }, [isOverflow]);

  useLayoutEffect(checkIfOverflows, [genresRef, screenWidth]);

  //TODO: when scrolled, and resize does not remove arrows,
  // maybe do some recalculations
  function checkIfOverflows () {
    const first = Object.values(genresRef)[0]?.current;
    const last = Object.values(genresRef).reverse()[0]?.current;

    if (!first || !last)
      return;

    // Set offset to 0 when resizing, to calculate properly
    if (!leftEnd && !isVisible(first)) {
      setOffset(0);
    }

    if (!isVisible(first, 'left') || !isVisible(last, 'right')) {
      setIsOverflow(true);
    } else
      setIsOverflow(false);
  }

  function slideLeft () {
    // Do nothing if we are at the left end or sliding
    if (leftEnd || isSliding) return;

    slide('left');
    isSliding = true;
    setTimeout(() => isSliding = false, SLIDE_DURATION);
  }

  function slideRight () {
    // Do nothing if we are at the right end or sliding
    if (rightEnd || isSliding) return;

    slide('right');
    isSliding = true;
    setTimeout(() => isSliding = false, SLIDE_DURATION);
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

  function genreClicked (genre) {
    let newGenres;
    if (selectedGenres.includes(genre))
      newGenres = selectedGenres.filter(g => g !== genre);
    else
      newGenres = selectedGenres.concat(genre);

    dispatch(updateFilter({ genres: newGenres }));
  }

  // TODO: Render selected genres as chips
  function renderGenres () {
    return genres.map(genre => {
      const { genreId: id, movieGenreName: name } = genre;
      return (
        <SingleGenre
          id={id}
          key={id}
          ref={genresRef[name]}
          isActive={selectedGenres.includes(genre)}
          onClick={() => genreClicked(genre)}
        >
          {name}
        </SingleGenre>);
    });
  }

  return (
    <GenresContainer {...props} isOverflow={isOverflow}>
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
