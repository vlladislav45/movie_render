import React from 'react';
import withRipple from 'HOC/withRipple';
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

const MovieCard = ({
                     movie: { id, year, movieName, movieRating, movieViews, summary, actors, genres },
                     poster, onClick, onBookMarkClick
                   }) => {
  
  function handleClick() {
    onClick(id);
  }
  
  function bookmarkMovie(e) {
    e.stopPropagation();
    onBookMarkClick(id, movieName);
  }
  
  
  return (
    <SingleMovieLink
      // onClick={handleClick}
    >
      <MoviePoster
        fadeIn={!!poster}
        alt={poster ? `Movie poster ${movieName}` : ''}
        src={poster}
      />
      <BookMarkFAB
        onClick={bookmarkMovie}
        title='Bookmark movie'
      >
        <BookMark/>
      </BookMarkFAB>
      <CardLowerSection>
        <MovieTitle>
          {movieName}
        </MovieTitle>
        <MovieSubTitle>
          <p>2h 32min</p>
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
        {/*<Year>{year}</Year>*/}
        {/*<MovieRating rating={movieRating} maxStars={5}/>*/}
        {/*<Views><small>Views:</small> {movieViews}</Views>*/}
        <BottomBar>
          <WatchButton
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
