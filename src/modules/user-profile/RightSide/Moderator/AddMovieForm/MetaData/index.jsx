import React from 'react';
import { Input, Chip } from 'components/basic';
import { useSelector } from 'react-redux';
import { MetaDataContainer } from './styles';

import { ReactComponent as LeadingIcon } from 'assets/icons/error.svg';


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
      <Input
        inputType='textarea'
        label='Summary'
        value={summary}
        loading={isLoading}
        helperText='Enter a summary for the movie'
      />
      <Input
        helperText='Enter the year of release'
        label='Year'
        loading={isLoading}
        value={year}
      />
      <Input
        value={director}
        loading={isLoading}
        helperText='Enter the director of the movie'
        label='Director'
      />
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column'}}>
          <Chip
            leadingIcon={LeadingIcon}
            chipText='With both'
          />
          <Chip
            closeable={false}
            chipText='Only text'
          />
          <Chip
            leadingIcon={LeadingIcon}
            closeable={false}
            chipText='With leading icon'
          />
          <Chip
            chipText='Only closeable'
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column'}}>
          <Chip
            chipType='outlined'
            leadingIcon={LeadingIcon}
            chipText='With both'
          />
          <Chip
            chipType='outlined'
            closeable={false}
            chipText='Only text'
          />
          <Chip
            chipType='outlined'
            leadingIcon={LeadingIcon}
            closeable={false}
            chipText='With leading icon'
          />
          <Chip
            chipType='outlined'
            chipText='Only closeable'
          />
        </div>
      </div>
      {/*{actors && actors.split(',').map(a => (*/}
      {/*  <Chip*/}
      {/*    leadingIcon={LeadingIcon}*/}
      {/*    key={Math.random()}*/}
      {/*    chipText={a}*/}
      {/*  />*/}
      {/*))}*/}
    </MetaDataContainer>
  );
};

export default MetaData;
