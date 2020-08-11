import React from 'react';
import { CastCard, CastContainer, GenresCard, GenresContainer } from './styles';
import { Chip } from 'components/basic';
import { CardTitle } from '../styles';

const MovieCast = ({ actors = [], director }) => {
  return (
    <CastContainer>
      <CardTitle>Cast</CardTitle>
      <CastCard>
        {actors.map((actor, index) => (
          <Chip
            key={`actor_${index}`}
            selectable={false}
            chipType='outlined'
            color='primary'
            chipText={actor}
            closeable={false}
          />
        ))}
        {director && (
          <>
            <span>Director</span>
            <div>{director}</div>
          </>
        )}
      </CastCard>
    </CastContainer>
  );
};

export default MovieCast;