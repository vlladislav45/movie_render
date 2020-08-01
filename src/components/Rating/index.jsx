import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import themes, { BASE_THEME } from '../../utils/themes';
import Star from './Star';
import { StarContainer, StyledRating } from './styles';

let index = 0;
const DEFAULT_STARS = 5;
const Rating = ({
  maxStars = DEFAULT_STARS,
  rating = 0,
  color = 'secondary',
  rateable = false,
  onRate = () => {},
  ...rest
}) => {
  const starProps = {
    color,
    rateable,
    onRate,
  };

  function renderRating () {
    if (rating === 0) return [...Array(maxStars)].map((u, i) =>
      <Star
        {...starProps}
        index={i}
        key={uniqueId('star_')}
        type='empty'
      />);

    // if we pass more rating then max stars, percentage = 1
    const percentage = Math.min(rating, maxStars) / maxStars;
    //TODO: Check this out
    // console.group('Rating');
    // console.log(rating);
    // console.groupEnd();
    const filledStars = Math.min(rating, maxStars) - 1;

    const stars = [...Array(Math.floor(filledStars))].map((u, i) =>
      <Star
        {...starProps}
        key={uniqueId('star_')}
        index={i}
        type='full'
      />,
    );

    if (stars.length === maxStars)
      return stars;

    {/*If the float is rounded to lower, render half empty star, else full star*/}
    const starType = Math.round(filledStars) < filledStars
      ? 'half-empty'
      : 'full';
    stars.push(
      <Star
        {...starProps}
        key={uniqueId('star_')}
        index={stars.length}
        type={starType}
      />,
    );

    for (let i = stars.length; i < maxStars; i++)
      stars.push(
        <Star
          {...starProps}
          key={uniqueId('star_')}
          index={i}
          type='empty'
        />,
      );

    return stars;
  }

  return (
    <StyledRating
      title={'Rating: ' + rating}
      {...rest}
    >
      {renderRating()}
    </StyledRating>
  );
};

Rating.propTypes = {
  maxStars: PropTypes.number,
  rating: PropTypes.number,
  color: PropTypes.oneOf(Object.keys(themes[BASE_THEME])),
  rateable: PropTypes.bool,
  onRate: PropTypes.func,
};

export default Rating;
