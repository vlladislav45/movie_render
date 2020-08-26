import React from 'react';
import { StyledSingleGenre } from './styles';


const SingleGenre = (props, ref) => {
  const { genre, isActive, isDisabled, onClick } = props;
  
  function handleClick() {
    if (!isDisabled && typeof onClick === 'function')
      onClick(genre)
  }
  
  return (
    <StyledSingleGenre
      id={genre}
      onClick={handleClick}
      isDisabled={isDisabled}
      isActive={isActive}
      ref={ref}
    >
      <p>{genre}</p>
    </StyledSingleGenre>
  );
};

export default React.memo(React.forwardRef(SingleGenre));