import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import themes, { BASE_THEME } from '../../utils/themes';
import Star from './Star';
import { StyledRating } from './styles';

const DEFAULT_STARS = 5;
const Rating = ({
  maxStars = DEFAULT_STARS,
  rating = 0,
  color = 'secondary',
  rateable = false,
  onRate = () => {},
  starSize = '24px',
  ...rest
}) => {
  const starProps = {
    color,
    rateable,
    onRate,
    starSize,
  };

  function renderRating () {
    if (rating === 0) return [...Array(maxStars)].map((u, i) =>
      <Star
        {...starProps}
        index={i}
        key={uniqueId('star_')}
        type='empty'
      />);
    
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
  starSize: PropTypes.string, // the css value of size (same for width and height), can be used with rem px pt etc etc
};

export default Rating;
