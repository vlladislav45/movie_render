import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { closeDialog, enqueueSnackbarMessage, openDialog } from 'reducers/uiReducer';
import { rateMovie } from 'reducers/moviesReducer';
import { RateDialog } from 'components';
import { msToTime } from 'utils/dateTimeUtils';
import { ReactComponent as BookMarkIcon } from 'assets/icons/bookmark.svg';
import { ReactComponent as RemoveBookmark } from 'assets/icons/remove_bookmark.svg';
import { ReactComponent as PlayIcon } from 'assets/icons/play.svg';
import {
    BookMark,
    BookMarkFAB,
    BottomBar,
    CardLowerSection,
    MoviePoster,
    MovieRating,
    SingleMovieLink,
    WatchButton,
} from './MoviePosterStyle';

const MovieCard = ({
    movie: { id, movieName, movieRating },
    poster, onClick, userId, isLoggedIn,
    onBookMarkClick, isBookmarked,
    showBookmark, isLoading
}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = useCallback(() => {
        onClick(id);
    }, [id]);

    const bookmarkMovie = useCallback((e) => {
        e.stopPropagation();
        onBookMarkClick(id, movieName);
    }, [onBookMarkClick, id, movieName])

    const doRate = useCallback(async (review, rate) => {
        if (!isLoggedIn) return;
        const { error } = await dispatch(rateMovie(id, userId, rate, review));
        const message = error
            ? `Error: ${error}`
            : `Successfully rated ${movieName} with ${rate} stars`;
        dispatch(enqueueSnackbarMessage(message, null, {
            // Base theme error color doesnt contrast with snackbar background
            useColor: error ? '#CF6679' : 'primary',
        }));
    }, [id, isLoggedIn])

    const openRateDialog = useCallback((rate) => {
        if (!isLoggedIn) return;
        dispatch(openDialog(<RateDialog
            title={`Rate with ${rate} stars`}
            onCancel={() => dispatch(closeDialog())}
            onConfirm={review => {
                dispatch(closeDialog());
                doRate(review, rate)
            }}
        />))
    }, [isLoggedIn])

    return (
        <SingleMovieLink>
            <MoviePoster
                fadeIn={!!poster}
                alt={poster ? `Movie poster ${movieName}` : ''}
                src={poster}
                onClick={handleClick}
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
                <BottomBar>
                    <WatchButton
                        Icon={PlayIcon}
                        color='secondary'
                        onClick={handleClick}
                        type='text'
                    >
                        Watch
          </WatchButton>
                    <MovieRating rateable={isLoggedIn} color='secondary' rating={movieRating} maxStars={5}
                        onRate={openRateDialog} starSize='1rem' />
                </BottomBar>
            </CardLowerSection>
        </SingleMovieLink>
    );
};

export default React.memo(MovieCard);
