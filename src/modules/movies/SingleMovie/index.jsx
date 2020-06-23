import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { API_URL } from 'api/BaseAPI';
import { fetchSingleMovie } from 'reducers/moviesReducer';
import MovieDataPair from './MovieDataPair';

const SingleMovie = ({ match: { params } }) => {
  const dispatch = useDispatch();
  const { movieId } = params;

  const { selectedMovie } = useSelector(({ moviesReducer: { selectedMovie } }) => ({
    selectedMovie,
  }));

  const { isLoading, movieInfo: pairs } = selectedMovie;


  useEffect(() => {
    dispatch(fetchSingleMovie(movieId));
  }, []);

  function renderMovieInfo() {
    let info = [];
    for (let key in pairs) {
      let value = pairs[key];
      if (typeof (value) === 'object') {
        value = Object.values(value)
      }
      info.push(
        <MovieDataPair key={Math.random()} pairKey={key} pairValue={value}/>
      );
    }
    return info;
  }

  return (
    <div>
      {renderMovieInfo()}
      {/*<video width="540" height="310" controls>*/}
      {/*  <source src={`${API_URL}stream/mp4/Kenpachi`} type="video/mp4"/>*/}
      {/*</video>*/}
    </div>
  );
};

export default withRouter(SingleMovie);
