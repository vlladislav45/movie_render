import React from 'react';
import { StyledSingleGenre } from './styles';


const SingleGenre = (props, ref) => {
  const { genre, isActive, isDisabled, onClick } = props;
  const { genreId: id, movieGenreName: name } = genre
  
  function handleClick() {
    if (!isDisabled && typeof onClick === 'function')
      onClick(genre)
  }
  
  return (
    <StyledSingleGenre
      id={id}
      onClick={handleClick}
      isDisabled={isDisabled}
      isActive={isActive}
      ref={ref}
    >
      <p>{name}</p>
    </StyledSingleGenre>
  );
};

export default React.memo(React.forwardRef(SingleGenre));