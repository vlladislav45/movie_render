import React, {
  createRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { calcOffset, getLastInvisible } from 'utils/DomUtils';
import {
  Arrow,
  Carousel,
  GenresContainer,
  GenresList,
  SingleGenre,
} from './styles';

const Genres = () => {
  const leftArrowRef = useRef();
  const rightArrowRef = useRef();
  // Array with refs for all the genres
  const [genresRef, setGenresRef] = useState({});

  const [offset, setOffset] = useState(0);
  const [genres, setGenres] = useState([]);
  const [leftEnd, setLeftEnd] = useState(true);
  const [rightEnd, setRightEnd] = useState(false);

  useEffect(() => {
    const genresFromBackend = require('./stub.json').genres;
    const refs = {};
    genresFromBackend.forEach(genre => refs[genre] = createRef());
    setGenres(genresFromBackend);
    setGenresRef(refs);
  }, []);

  function slideLeft () {
    // Do nothing if we are at the left end
    if (leftEnd) return;

    slide('left');
  }

  function slideRight () {
    // Do nothing if we are at the right end
    if (rightEnd) return;

    slide('right');
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

  function renderGenres () {
    return genres.map((genre, index) =>
      <SingleGenre
        key={index}
        ref={genresRef[genre]}
      >
        {genre}
      </SingleGenre>);
  }

  return (
    <GenresContainer>
      <Arrow
        flipped={'true'}
        ref={leftArrowRef}
        disabled={leftEnd}
        onClick={slideLeft}
      />
      <Carousel>
        <GenresList
          offset={offset}
        >
          {renderGenres()}
        </GenresList>
      </Carousel>
      <Arrow
        ref={rightArrowRef}
        disabled={rightEnd}
        onClickCapture={slideRight}
      />
    </GenresContainer>
  );
};

export default Genres;
