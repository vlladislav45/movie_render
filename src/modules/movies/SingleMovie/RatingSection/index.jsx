import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enqueueSnackbarMessage, promptUser } from 'reducers/uiReducer';
import { getReviewsByMovie, rateMovie } from 'reducers/moviesReducer';
import SingleReview from './SingleReview';
import { NoReviewsText, RateMovieBtn, ReviewsContainer, StyledRatingSection } from './styles';
import { CardTitle } from '../styles';
import Loading from '../../../../components/Loading';

const RatingSection = ({ movieName, movieId, oneColumn }) => {
  const dispatch = useDispatch();
  
  const { isLoggedIn, movieRating, userId, username, reviews, reviewsLoading } = useSelector(
    ({
       moviesReducer: { selectedMovie: { movieInfo, reviews, reviewsLoading } },
       auth: { loggedInUser, isLoggedIn },
     }) => ({
      movieRating: movieInfo.movieRating,
      userId: loggedInUser.userId,
      username: loggedInUser.username,
      isLoggedIn, reviews, reviewsLoading,
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
  
  const isUserRated = useMemo(() => isLoggedIn && reviews.some(r => r.username === username), [reviews]);
  
  useEffect(() => {
    console.group('isUserRated');
    console.log(isUserRated);
    console.groupEnd();
  }, [isUserRated])
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
      <Loading isLoading={reviewsLoading} />
      <CardTitle>
        Reviews:
      </CardTitle>
      <ReviewsContainer>
        <RateMovieBtn
          id='movieRating'
          title={isLoggedIn ? isUserRated ? 'You already rated this movie' : 'Rate movie' : 'You need to login to rate'}
          rateable={isLoggedIn && !isUserRated}
          onRate={openRateDialog}
          maxStars={5}
          rating={movieRating}
          color={(!isLoggedIn || isUserRated) ? 'disabled' : 'primary'}
        />
        {!reviewsLoading && reviews.length === 0 && <NoReviewsText>Be the first to leave a review</NoReviewsText>}
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
