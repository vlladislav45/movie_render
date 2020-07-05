import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { API_URL } from 'api/BaseAPI';
import { Loading, Rating, Tabs } from 'components';
import { fetchMovies, getMoviesCount } from 'reducers/moviesReducer';
import MoviesPagination from '../MoviesPagination';
import {
  CurrentMovies,
  MovieNameText,
  MoviePoster, MoviesContent, NextMovies,
  PosterContainer,
  SingleMovieLink,
  StyledMoviesContainer,
  Views,
  Year,
} from './styles';

let timeout;
const MoviesContainer = ({ history }) => {
  const dispatch = useDispatch();

  const { movies, moviesPerPage, selectedPage, isLoading } = useSelector(
    ({ moviesReducer }) => ({
      movies: moviesReducer.movies,
      selectedPage: moviesReducer.selectedPage,
      moviesPerPage: moviesReducer.moviesPerPage,
      isLoading: moviesReducer.isLoading,
    }));

  //TODO: see if its possible to make grow transition between this page and SingleMoviePage
  const [openedMovie, setOpenedMovie] = useState({});
  // const [currentMovies, setCurrentMovies] = useState(movies);
  // const [slideMovies, setSlideMovies] = useState(false);

  useEffect(() => {
    dispatch(fetchMovies(selectedPage, moviesPerPage));
    dispatch(getMoviesCount());
  }, [selectedPage, moviesPerPage]);

  // useEffect(() => {
  //   if (movies.length <= 0)
  //     return;
  //
  //   clearTimeout(timeout);
  //   setSlideMovies(true);
  //   setTimeout(() => {
  //     setCurrentMovies(movies);
  //     setSlideMovies(false);
  //   }, 1000);
  //
  // }, [movies]);

  function imageLoaded (e) {
    e.target.style.opacity = '1';
  }

  function clickedMovie (id, e) {
    // setOpenedMovie({ id, element: e.target });
    history.push('/movie/' + id);
  }

  function renderMovies (moviesToRender) {
    return moviesToRender.map(movie => (
        <SingleMovieLink
          // isClicked={openedMovie.id === movie.id}
          // element={openedMovie.element}
          // key={Math.random()}
          size='m'
          key={movie.id}
          elevation={4}
          onClick={e => clickedMovie(movie.id, e)}
          shouldElevateWhenHover
          withRipple
        >
          <MovieNameText title={movie.movieName}>{movie.movieName}</MovieNameText>
          <Year>{movie.year}</Year>
          <PosterContainer>
            <MoviePoster
              // src={'https://placeimg.com/100/100/any&rnd=' + Math.random()}
              src={`${API_URL}movies/poster/${movie.posterName}`}
              onLoad={imageLoaded}
            />
          </PosterContainer>
          <Rating rating={movie.movieRating} maxStars={5}/>
          {/*<Rating*/}
          {/*  rating={parseFloat((Math.random() * (0.0 - 5.0) + 5.0).toFixed(2))}*/}
          {/*  maxStars={5}/>*/}
          <Views><small>Views:</small> {movie.movieViews}</Views>
        </SingleMovieLink>
      ),
    );
  }

  const render = (moviesToRender, onlyContent = false) => (
    <StyledMoviesContainer
      moviesPerPage={moviesPerPage}
    >
      <MoviesPagination
        style={{ visibility: onlyContent ? 'hidden' : 'visible' }}/>
      {renderMovies(moviesToRender)}
    </StyledMoviesContainer>
  );

  return (
    <>
      {/*<CurrentMovies>*/}
      {/*  {render(currentMovies)}*/}
      {/*</CurrentMovies>*/}
      {/*<NextMovies*/}
      {/*  // slide={slideMovies}*/}
      {/*>*/}
        {render(movies)}
      {/*</NextMovies>*/}
    </>
  );
};

export default withRouter(MoviesContainer);
