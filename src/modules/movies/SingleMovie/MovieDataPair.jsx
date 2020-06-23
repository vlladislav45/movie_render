import React from 'react';
import { MovieData, MovieDataKey, MovieDataValue } from './styles';


export default ({ pairKey, pairValue }) => (
  <MovieData>
    <MovieDataKey>
      {pairKey}
    </MovieDataKey>
    <MovieDataValue>
      {pairValue}
    </MovieDataValue>
  </MovieData>
);