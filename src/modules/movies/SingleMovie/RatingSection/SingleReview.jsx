import React from 'react';
import {
  AuthorImage,
  AuthorsName,
  ReviewContent,
  ReviewRating,
  StyledSingleReview
} from './SingleReviewStyles';

const SingleReview = ({ review: { comment, movieRating, username }, isOwn }) => {
  
  function openProfile() {
  
  }
  
  return (
    <StyledSingleReview
      $isOwn={isOwn}
    >
      <AuthorsName
        title='View profile'
        onClick={openProfile}
      >{username}</AuthorsName>
      <AuthorImage
        src='https://picsum.photos/50'
        alt={'image'}
      />
      <ReviewContent>
        {comment}
      </ReviewContent>
      <ReviewRating
        rating={movieRating}
        maxStars={5}
        starSize='18px'
        color='onSurface'
      />
    </StyledSingleReview>
  );
};

export default SingleReview;