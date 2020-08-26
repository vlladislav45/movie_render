import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AddMultipleChips from './AddMultipleChips';


const Genres = () => {
  const {
    isLoading = false,
    genres: movieGenres = '',
  } = useSelector(({ moderatorReducer: { movieData } }) => ({
    isLoading: movieData.isLoading,
    genres: movieData.Genre,
  }));

  const [genres, setGenres] = useState([]);

  useEffect(() => {
    if (movieGenres)
      setGenres(movieGenres.split(','));
  }, [movieGenres]);

  return (
    <AddMultipleChips
      data={genres}
      updateData={setGenres}
      isLoading={isLoading}
      inputLabel='Add Genre'
    />
  );
};

export default Genres;