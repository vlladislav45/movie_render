import React from 'react';
import { GenresCard, GenresContainer } from './styles';
import { Chip } from 'components/basic';
import { CardTitle } from '../styles';

const MovieGenres = ({ genres = [], oneColumn }) => {
  return (
    <GenresContainer
      $oneColumn={oneColumn}
    >
      <CardTitle>Genres</CardTitle>
      <GenresCard>
        {genres.map((genre, index) => (
          <Chip
            key={`genre_${index}`}
            selectable={false}
            chipType='outlined'
            color='primary'
            chipText={genre}
            closeable={false}
          />
        ))}
      </GenresCard>
    </GenresContainer>
  );
};

export default MovieGenres;