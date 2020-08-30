import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { closeDialog, enqueueSnackbarMessage, openDialog } from 'reducers/uiReducer';
import { rateMovie } from 'reducers/moviesReducer';
import { RateDialog } from 'components';
import { msToTime } from 'utils/dateTimeUtils';
import { ReactComponent as BookMarkIcon } from 'assets/icons/bookmark.svg';
import { ReactComponent as RemoveBookmark } from 'assets/icons/remove_bookmark.svg';
import { ReactComponent as PlayIcon } from 'assets/icons/play.svg';
import {
  CardLowerSection,
  MovieTitle,
  MoviePoster,
  SingleMovieLink,
  MovieRating,
  BookMarkFAB,
  BookMark,
  MovieSummaryContainer,
  SummaryTitle,
  Summary,
  MovieSubTitle,
  Actors,
  WatchButton,
  BottomBar,
} from './MovieCardStyle';

const MovieCard = ({
                     movie: { id, year, movieName, movieRating, summary, actors, genres, duration },
                     poster, onClick, userId,
                     onBookMarkClick, isBookmarked,
                     showBookmark, isLoading
                   }) => {
  const dispatch = useDispatch();
  
  function handleClick() {
    onClick(id);
  }
  
  function bookmarkMovie(e) {
    e.stopPropagation();
    onBookMarkClick(id, movieName);
  }
  
  const doRate = React.useCallback(async (review, rate) => {
    const { error } = await dispatch(rateMovie(id, userId, rate, review));
    const message = error
      ? `Error: ${error}`
      : `Successfully rated ${movieName} with ${rate} stars`;
    dispatch(enqueueSnackbarMessage(message, null, {
      // Base theme error color doesnt contrast with snackbar background
      useColor: error ? '#CF6679' : 'primary',
    }));
  }, [id, userId])
  
  const openRateDialog = React.useCallback((rate) => {
    dispatch(openDialog(<RateDialog
      title={`Rate with ${rate} stars`}
      onCancel={() => dispatch(closeDialog())}
      onConfirm={review => {
        dispatch(closeDialog());
        doRate(review, rate)
      }}
    />))
  }, [])
  
  return (
    <SingleMovieLink>
      <MoviePoster
        fadeIn={!!poster}
        alt={poster ? `Movie poster ${movieName}` : ''}
        src={poster}
      />
      {showBookmark && (
        <BookMarkFAB
          onClick={bookmarkMovie}
          title={isBookmarked ? 'Remove bookmark' : 'Bookmark movie'}
          $disabled={isLoading}
          $isLoading={isLoading}
        >
          <BookMark
            as={isBookmarked ? RemoveBookmark : BookMarkIcon}
            $isLoading={isLoading}
          />
        </BookMarkFAB>
      )}
      <CardLowerSection>
        <MovieTitle>
          {movieName}
        </MovieTitle>
        <MovieSubTitle>
          <p>{msToTime(duration)}</p>
          <p>/</p>
          <p>{year}</p>
          {genres.length > 0 && (
            <>
              <p>/</p>
              <p>{genres.join(', ')}</p>
            </>
          )}
        </MovieSubTitle>
        {summary && (
          <MovieSummaryContainer>
            <SummaryTitle>Summary</SummaryTitle>
            <Summary>{summary}</Summary>
          </MovieSummaryContainer>
        )}
        <Actors>
          {actors.join(', ')}
        </Actors>
        <BottomBar>
          <WatchButton
            Icon={PlayIcon}
            color='secondary'
            onClick={handleClick}
            type='text'
          >
            Watch
          </WatchButton>
          <MovieRating rateable color='secondary' rating={movieRating} maxStars={5} onRate={openRateDialog}/>
        </BottomBar>
      </CardLowerSection>
    </SingleMovieLink>
  
  );
};

export default MovieCard;
