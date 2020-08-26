import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AddMultipleChips from './AddMultipleChips';

const Actors = () => {
  const {
    isLoading = false,
    actors: movieActors = '',
  } = useSelector(({ moderatorReducer: { movieData } }) => ({
    isLoading: movieData.isLoading,
    actors: movieData.Actors,
  }));

  const [actors, setActors] = useState([]);
  useEffect(() => {
    if (movieActors)
      setActors(movieActors.split(','));
  }, [movieActors]);

  return (
    <AddMultipleChips
      data={actors}
      updateData={setActors}
      isLoading={isLoading}
      inputLabel='Add Actor'
    />
  )
};

export default Actors;