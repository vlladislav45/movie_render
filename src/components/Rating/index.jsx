import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as EmptyStar } from 'assets/icons/star-empty.svg';
import { ReactComponent as HalfEmptyStar } from 'assets/icons/star-half-fill.svg';
import { ReactComponent as FullStar } from 'assets/icons/star-fill.svg';
import { StarContainer, StyledRating } from './styles';

let index = 0;
const DEFAULT_STARS = 5;
const Rating = ({ maxStars = DEFAULT_STARS, rating = 0 }) => {
  function renderRating () {
    if (rating === 0) return [...Array(maxStars)].map(() =>
      <StarContainer key={`star_${index++}`}>
        <EmptyStar/>
      </StarContainer>);

    const percentage = rating / maxStars;
    const filledStars = percentage * maxStars;

    const stars = [...Array(Math.floor(filledStars))].map((u, i) =>
      <StarContainer
        key={`star_${index++}`}
      >
        <FullStar/>
      </StarContainer>,
    );

    stars.push(
      <StarContainer
        key={`star_${index++}`}
      >
        {/*If the float is rounded to lower, render half empty star, else full star*/}
        {Math.round(filledStars) < filledStars ? <HalfEmptyStar/> : <FullStar/>}
      </StarContainer>);

    for (let i = stars.length; i < maxStars; i++)
      stars.push(
        <StarContainer
          key={`star_${index++}`}
        >
          <EmptyStar/>
        </StarContainer>);

    return stars;
  }

  return (
    <StyledRating title={'Rating: ' + rating}>
      {renderRating()}
    </StyledRating>
  );
};

Rating.propTypes = {
  maxStars: PropTypes.number,
  rating: PropTypes.number,
};

export default Rating;
