import React from 'react';
import { StarContainer } from './styles';

import { ReactComponent as EmptyStar } from 'assets/icons/star-empty.svg';
import { ReactComponent as HalfEmptyStar } from 'assets/icons/star-half-fill.svg';
import { ReactComponent as FullStar } from 'assets/icons/star-fill.svg';

export default ({ index, type, onRate, rateable, color }) => {
  function handleClick () {
    if (rateable && onRate)
      onRate(index + 1); //index starts from 0
  }

  return (
    <StarContainer
      rateable={rateable}
      color={color}
      onClickCapture={handleClick}
      title={rateable && `Rate the movie with ${index + 1} stars`}
    >
      {type === 'empty' && <EmptyStar/>}
      {type === 'half-empty' && <HalfEmptyStar/>}
      {type === 'full' && <FullStar/>}
    </StarContainer>
  );
}
