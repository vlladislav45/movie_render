import React from 'react';
import { MovieActors } from './styles';

//TODO: when actor clicked maybe open info about the actor or movies with this actor
const Actors = ({ actors = [] }) => {

  return (
    <MovieActors className='movieInfo'>
      <span className='movieInfoName'>Actors: </span>
      <span className='actors'>
        {actors.length > 0 ?
          actors.map(
            a => <span className='actor' key={a}>{a},</span>)
          : 'Unknown'
        }
      </span>
    </MovieActors>
  );
};

export default Actors;
