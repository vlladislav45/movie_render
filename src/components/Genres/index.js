import React, { createRef, useEffect, useRef, useState } from 'react';
import { calcOffset, getLastInvisible } from 'utils/DomUtils';
import { Arrow, Carousel, GenresContainer, GenresList, SingleGenre } from './styles';


const Genres = () => {
  const containerRef = useRef();
  const leftArrowRef = useRef();
  const rightArrowRef = useRef();
  const [ offset, setOffset ] = useState(0);
  const [ genres, setGenres ] = useState([]);
  const [ genresRef, setGenresRef ] = useState({});
  const [leftEnd, setLeftEnd] = useState(true);
  const [rightEnd, setRightEnd] = useState(false);

  useEffect(() => {
    const genresFromBackend = require('./stub.json').genres;
    const refs = {};
    genresFromBackend.forEach(genre => refs[genre] = createRef());
    setGenres(genresFromBackend);
    setGenresRef(refs);
  }, []);

  // Get the refs reversed, and check for the first ref that is visible
  // Then take the previous ref (the last invisible)
  function slideLeft() {
    // Do nothing if we are at the left end
    if(leftEnd) return;

    const genresRefsArray = Object.values(genresRef);
    const firstHidden = getLastInvisible(genresRefsArray);

    // The first hidden is the first element, now we slide it, next time we are the the end
    if ( firstHidden === genresRefsArray[0].current ) {
      setLeftEnd(true);
    }

    const offsetToBeVisible = calcOffset(firstHidden, leftArrowRef.current, true);
    // We scroll left, so we are 100% not in the right end
    setRightEnd(false);
    setOffset(Math.min(0, offset + offsetToBeVisible));
  }

  function slideRight() {

    // Do nothing if we are at the right end
    if(rightEnd) return;

    const genresRefsArray = Object.values(genresRef).reverse();
    const firstHidden = getLastInvisible(genresRefsArray);

    // The first hidden is the first element, now we slide it, next time we are the the end
    if ( firstHidden === genresRefsArray[0].current ) {
      setRightEnd(true);
    }

    const { right, width } = containerRef.current.getBoundingClientRect();
    const { width: arrowWidth } = rightArrowRef.current.getBoundingClientRect();
    const offsetToBeVisible = calcOffset(firstHidden, rightArrowRef.current, false);
    // slided right, we are sure we are not at the left end
    setLeftEnd(false);
    const endOfCarousel = right - arrowWidth;
    let newOffset = offset - offsetToBeVisible;
    console.log(endOfCarousel);
    console.log(newOffset);
    if (Math.abs(newOffset) > endOfCarousel) {
      newOffset = -endOfCarousel;
    }

    console.log(newOffset)
    setOffset(newOffset);
  }

  function renderGenres() {
    return genres.map((genre, index) =>
      <SingleGenre
        key={index}
        ref={genresRef[genre]}
      >
        {genre}
      </SingleGenre>);
  }

  return (
    <GenresContainer ref={containerRef}>
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
        onClick={slideRight}
      />
    </GenresContainer>
  );
};

export default Genres;