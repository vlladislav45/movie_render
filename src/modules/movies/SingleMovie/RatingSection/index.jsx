import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enqueueSnackbarMessage, promptUser } from 'reducers/uiReducer';
import { getReviewsByMovie, rateMovie } from 'reducers/moviesReducer';
import SingleReview from './SingleReview';
import { RateMovieBtn, ReviewsContainer, StyledRatingSection } from './styles';
import { CardTitle } from '../styles';

const RatingSection = ({ movieName, movieId, oneColumn }) => {
  const dispatch = useDispatch();
  
  const { movieRating, userId, username, reviews } = useSelector(
    ({
       moviesReducer: { selectedMovie: { movieInfo, reviews } },
       auth: { loggedInUser },
     }) => ({
      movieRating: movieInfo.movieRating,
      userId: loggedInUser.userId,
      username: loggedInUser.username,
      reviews,
    }));
  
  const [sortedReviews, setSortedReviews] = useState([]);
  
  useEffect(() => {
    dispatch(getReviewsByMovie(movieId));
  }, [])
  
  useEffect(() => {
    if (isUserRated) {
      const ownReview = reviews.filter(r => r.username === username);
      const restReviews = reviews.filter(r => r.username !== username);
      // TODO: Rework this with pagination
      setSortedReviews([...ownReview, ...restReviews]);
    }
    else
      setSortedReviews(reviews);
  }, [reviews])
  
  const isUserRated = useMemo(() => reviews.some(r => r.username === username), [reviews])
  
  async function doRate(review, rate) {
    const { error } = await dispatch(rateMovie(movieId, userId, rate, review));
    const message = error
      ? `Error: ${error}`
      : `Successfully rated ${movieName} with ${rate} stars`;
    dispatch(enqueueSnackbarMessage(message, null, {
      // Base theme error color doesnt contrast with snackbar background
      useColor: error ? '#CF6679' : 'primary',
    }));
    // Fetch the new review
    dispatch(getReviewsByMovie(movieId));
  }
  
  function openRateDialog(rate) {
    dispatch(promptUser({
      isOpen: true,
      text: `You are about to rate ${movieName} with ${rate} stars`,
      formField: true,
      formFieldData: {
        label: 'Add review',
        helperText: 'Review text is optional',
        type: 'textarea',
        onPrimary: true, //Not actually on primary, but use secondary color for accent
        withCharacterCount: true,
      },
      onConfirm: review => doRate(review, rate),
    }));
  }
  
  return (
    <StyledRatingSection
      $oneColumn={oneColumn}
    >
      <CardTitle>
        Reviews:
      </CardTitle>
      <ReviewsContainer>
        <RateMovieBtn
          id='movieRating'
          title={isUserRated ? 'You already rated this movie' : 'Rate movie'}
          rateable={!isUserRated}
          onRate={openRateDialog}
          maxStars={5}
          rating={movieRating}
          color={isUserRated ? 'onSurface' : 'primary'}
        />
        {sortedReviews.map((review, index) => (
          <SingleReview
            key={`review_${index}`}
            review={review}
            isOwn={review.username === username}
          />))}
      </ReviewsContainer>
    </StyledRatingSection>
  );
};

export default RatingSection;
