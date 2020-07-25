import React from 'react';
import { Input } from 'components/basic';
import { useSelector } from 'react-redux';
import { MetaDataContainer } from './styles';

const MetaData = props => {

  const {
    isLoading = false,
    year, summary,
    director, actors,
    writer,
  } = useSelector(({ moderatorReducer: { movieData } }) => ({
    isLoading: movieData.isLoading,
    year: movieData.Year,
    director: movieData.Director,
    summary: movieData.Plot,
    actors: movieData.Actors,
    writer: movieData.Writer,
  }));


  return (
    <MetaDataContainer>
      <Input inputType='textarea' label='Summary'
             value={summary}
             loading={isLoading}
             helperText='Enter a summary for the movie '/>
      <Input
        helperText='Enter the year of release'
        label='Year'
        loading={isLoading}
        value={year}
      />
      <Input value={director} loading={isLoading} helperText='Enter the director of the movie' label='Director'/>
    </MetaDataContainer>
  );
};

export default MetaData;
