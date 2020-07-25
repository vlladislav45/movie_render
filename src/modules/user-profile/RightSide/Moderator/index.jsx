import React from 'react';
import AddMovieForm from './AddMovieForm';
import { ModeratorTabWrapper, } from './styles';

const Moderator = () => {

  return (
    <ModeratorTabWrapper>
      <AddMovieForm/>
    </ModeratorTabWrapper>
  )
};

export default Moderator;
