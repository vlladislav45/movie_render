import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rating } from 'components';
import { enqueueSnackbarMessage, promptUser } from 'reducers/uiReducer';
import { rateMovie } from 'reducers/moviesReducer';

const RatingSection = ({ movieName, movieId }) => {
  const dispatch = useDispatch();

  // TODO: userId from auth reducer
  const { movieRating, userId } = useSelector(
    ({ moviesReducer: { selectedMovie: { movieInfo } } }) => ({
      movieRating: movieInfo.movieRating,
    }));

  async function doRate (review, rate) {
    const { error } = await dispatch(rateMovie(movieId, 1, rate, review));
    const message = error
      ? `Error: ${error}`
      : `Successfully rated ${movieName} with ${rate} stars`;
    dispatch(enqueueSnackbarMessage(message, null, {
      // Base theme error color doesnt contrast with snackbar background
      useColor: error ? '#CF6679' : 'primary',
    }));
  }

  function openRateDialog (rate) {
    dispatch(promptUser({
      isOpen: true,
      text: `You are about to rate ${movieName} with ${rate} stars`,
      formField: true,
      formFieldData: {
        label: 'Add review',
        helperText: 'You can submit additional review if you want',
        type: 'textarea',
        onPrimary: true, //Not actually on primary, but use secondary color for accent
      },
      onConfirm: review => doRate(review, rate),
    }));
  }

  return (
    <>
      <span className='movieInfoName rating'>Rating:</span>
      <span className='movieInfo rating'>
          <Rating
            id='movieRating'
            rateable
            onRate={openRateDialog}
            maxStars={5}
            rating={movieRating}
            color='onSurface'
          />
        </span>
    </>
  );
};

export default RatingSection;
