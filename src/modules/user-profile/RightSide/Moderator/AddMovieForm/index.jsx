import React from 'react';
import BaseData from './BaseData';
import MovieTitleInput from './MovieTitleInput';
import MetaData from './MetaData';
import { MovieForm, MovieFormLowerSection } from './styles';

const AddMovieForm = () => {

  return (
    <MovieForm
      autoComplete="off"
    >
      {/*Movie title, movie poster, movie video*/}
      <MovieTitleInput/>
      <MovieFormLowerSection>
        {/* Movie preview, upload movie */}
        <BaseData />
        {/*Movie year, director, actors and other meta data*/}
        <MetaData/>
      </MovieFormLowerSection>
    </MovieForm>
  );
};

export default AddMovieForm;
