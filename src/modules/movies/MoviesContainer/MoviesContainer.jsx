import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getMoviesCount } from 'reducers/moviesReducer';
import { Loading, Rating } from 'components';
import { API_URL } from 'api/BaseAPI';
import Input from '../../../components/basic/Input';
import MoviesPagination from '../MoviesPagination';
import {
  MovieNameText,
  MoviePoster,
  PosterContainer,
  SingleMovieLink,
  StyledMoviesContainer,
  Views, Year,
} from './styles';

const MoviesContainer = ({ history }) => {
  const dispatch = useDispatch();

  const { movies, moviesPerPage, isLoading, isDark } = useSelector(
    ({ moviesReducer, themeReducer }) => ({
      movies: moviesReducer.movies,
      selectedPage: moviesReducer.selectedPage,
      moviesPerPage: moviesReducer.moviesPerPage,
      isLoading: moviesReducer.isLoading,
      isDark: themeReducer.themeColors.isDark,
    }));

  useEffect(() => {
    dispatch(fetchMovies(0, moviesPerPage));
    dispatch(getMoviesCount());
  }, [moviesPerPage]);

  function imageLoaded (e) {
    // TODO:
  }

  function renderMovies () {
    return movies.map(movie => (
        <SingleMovieLink
          // key={Math.random()}
          key={movie.id}
          elevation={8}
          // onClick={() => history.push('/movie/' + movie.id)}
          shouldElevateWhenHover
        >
          <MovieNameText>{movie.movieName}</MovieNameText>
          <PosterContainer>
            <MoviePoster
              // src={'https://placeimg.com/100/100/any&rnd=' + Math.random()}
              src={`${API_URL}movies/poster/${movie.posterName}`}
              onLoad={imageLoaded}
            />
          </PosterContainer>
          {/*<Rating rating={movie.movieRating} maxStars={5}/>*/}
          <Rating rating={(Math.random() * (0.0 - 5.0) + 5.0).toFixed(2)} maxStars={5}/>
          <Views><small>Views:</small> {movie.movieViews}</Views>
        </SingleMovieLink>
      ),
    );
  }

  return (
    <StyledMoviesContainer
      moviesPerPage={moviesPerPage}
    >
      {/*<div style={{ display: 'grid', gridTemplateRows: 'repeat(5, 1fr)', gridRowGap:'30px' }}>*/}
      {/*  <Input label='Simple' />*/}
      {/*  <Input label='With helper' helperText='helper text' />*/}
      {/*  <Input label='With error' errorText='error text' />*/}
      {/*  <Input placeholder='no label' />*/}
      {/*  <Input placeholder='no label' text='Prefilled' />*/}
      {/*</div>*/}
      {/*<div style={{*/}
      {/*  width: '300px',*/}
      {/*  height: '300px',*/}
      {/*  background: '#000000'*/}
      {/*}}>*/}
      {/*  <div style={{*/}
      {/*    width: '300px',*/}
      {/*    height: '300px',*/}
      {/*    background: '#FFFFFF',*/}
      {/*    opacity: '0.38'*/}
      {/*  }}>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <MoviesPagination/>
      {isLoading ? <Loading/> : renderMovies()}
    </StyledMoviesContainer>
  );
};

export default withRouter(MoviesContainer);
