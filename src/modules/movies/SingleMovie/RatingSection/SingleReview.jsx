import React from 'react';
import { ReviewAuthor, ReviewContent, ReviewRating, StyledSingleReview } from './styles';

const SingleReview = ({ review: { comment, movieRating, username } }) => {
  
  return (
    <StyledSingleReview>
      <ReviewAuthor>
        <img src='https://picsum.photos/50' alt={'image'}/>
        <p>{username}</p>
      </ReviewAuthor>
      <ReviewContent>
        {comment}
      </ReviewContent>
      <ReviewRating
        rating={movieRating}
        maxStars={5}
        color='onSurface'
      />
    </StyledSingleReview>
  );
};

export default SingleReview;