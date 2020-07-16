import React from 'react';
import { MovieActors } from './styles';

//TODO: when actor clicked maybe open info about the actor or movies with this actor
const Actors = ({ actors = [] }) => {

  return (
    <>
      <span className='movieInfoName actors'>Actors: </span>
      <span className='movieInfo actors'>
        <ul>
          {actors.length > 0 ?
            actors.map(
              a => <li className='actor' key={a}>{a},</li>)
            : 'Unknown'
          }
        </ul>
      </span>
    </>
  );
};

export default Actors;
