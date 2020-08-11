import React, { useMemo } from 'react';
import { ReactComponent as BookMarkIcon } from 'assets/icons/bookmark.svg';
import { ReactComponent as RemoveBookmark } from 'assets/icons/remove_bookmark.svg';
import { ReactComponent as PlayIcon } from 'assets/icons/play.svg';
import {
  CardLowerSection,
  MovieTitle,
  MoviePoster,
  SingleMovieLink,
  MovieRating,
  Views,
  Year,
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
import { msToTime } from 'utils/DateTimeUtils';

const MovieCard = ({
                     movie: { id, year, movieName, movieRating, summary, actors, genres, duration },
                     poster, onClick,
                     onBookMarkClick, isBookmarked,
                     showBookmark, isLoading
                   }) => {
  
  function handleClick() {
    onClick(id);
  }
  
  function bookmarkMovie(e) {
    e.stopPropagation();
    onBookMarkClick(id, movieName);
  }
  
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
          <MovieRating color='secondary' rating={movieRating} maxStars={5}/>
        </BottomBar>
      </CardLowerSection>
    </SingleMovieLink>
  
  );
};

export default MovieCard;
