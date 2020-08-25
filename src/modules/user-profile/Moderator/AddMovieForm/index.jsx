import React from 'react';
import BaseData from './BaseData';
import MovieTitleInput from './MovieTitleInput';
import MetaData from './MetaData';
import Actors from './Actors';
import MovieGenres from './MovieGenres';
import { MovieForm, MovieFormLowerSection } from './styles';
import useDeviceDimensions from '../../../../hooks/useDeviceDimensions';

const AddMovieForm = () => {
  const device = useDeviceDimensions();
  return (
    <MovieForm
      autoComplete="off"
    >
      <MovieTitleInput/>
      <MovieFormLowerSection>
        {/* Movie preview, upload movie */}
        <BaseData />
        {/*Movie year, director, actors and other meta data*/}
        <MetaData/>
      </MovieFormLowerSection>
      <Actors />
      <MovieGenres />
    </MovieForm>
  );
};

export default AddMovieForm;
