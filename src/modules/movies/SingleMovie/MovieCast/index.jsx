import React from 'react';
import { CastCard, CastContainer, CastSection, CastSectionTitle, GenresCard, GenresContainer } from './styles';
import { Chip } from 'components/basic';
import { CardTitle } from '../styles';

const MovieCast = ({ actors = [], director, oneColumn }) => {
  return (
    <CastContainer
      $oneColumn={oneColumn}
    >
      <CardTitle>Cast</CardTitle>
      <CastCard>
        {actors.length > 0 && (
          <CastSection>
            <CastSectionTitle $oneColumn={oneColumn}>Actors: </CastSectionTitle>
            {actors.map((actor, index) => (
              <Chip
                key={`actor_${index}`}
                selectable={false}
                chipType='outlined'
                color='primary'
                chipText={actor}
                closeable={false}
                style={{ marginBottom: '2px'}}
              />
            ))}
          </CastSection>
        )}
        {director && (
          <CastSection>
            <CastSectionTitle $oneColumn={oneColumn} >Director: </CastSectionTitle>
            <Chip
              selectable={false}
              chipText={director}
              chipType='outlined'
              closeable={false}
              color='primary'
            />
          </CastSection>
        )}
      </CastCard>
    </CastContainer>
  );
};

export default MovieCast;