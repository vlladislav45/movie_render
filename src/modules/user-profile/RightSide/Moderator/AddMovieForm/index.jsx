import React, { useRef } from 'react';
import { Input } from 'components/basic';
import { MovieForm, MovieFormOptional, MovieFormRequired } from './styles';

const AddMovieForm = () => {
  const videoUploadRef = useRef();
  return (
    <MovieForm>
      <MovieFormRequired>
      <Input helperText='Movie name'/>
      <input type='file' hidden ref={videoUploadRef} />
      </MovieFormRequired>
      <MovieFormOptional>
        <Input helperText='Enter the year of release' label='Year' />
        <Input helperText='Enter the director of the movie' label='Director' />
        <Input inputType='textarea' label='Summary' helperText='Enter a summary for the movie '/>
      </MovieFormOptional>
    </MovieForm>
  )
};

export default AddMovieForm;
