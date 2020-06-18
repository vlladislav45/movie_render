import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as EmptyStar } from 'assets/icons/star-empty.svg';
import { ReactComponent as HalfEmptyStar } from 'assets/icons/star-half-fill.svg';
import { ReactComponent as FullStar } from 'assets/icons/star-fill.svg';
import { StarContainer, StyledRating } from './styles';

const DEFAULT_STARS = 5;
const Rating = ({ maxStars = DEFAULT_STARS, rating = 0 }) => {
  function renderRating() {
    return [...Array(maxStars)].map(i => i).map((und, i) =>  {
      if (i > rating && i - 1 < rating)
        return (
          <StarContainer key={i}>
            <HalfEmptyStar/>
          </StarContainer>
        );
      else {
        return (
          <StarContainer key={i}>
            {i > rating ? <EmptyStar/> : <FullStar/>}
          </StarContainer>
        )
      }
    })
  }

  return (
    <StyledRating title={'Rating: ' + rating}>
      {renderRating()}
    </StyledRating>
  )
};

Rating.propTypes = {
  maxStars: PropTypes.number,
  rating: PropTypes.number,
};

export default Rating;