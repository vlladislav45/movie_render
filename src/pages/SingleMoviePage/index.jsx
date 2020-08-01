import React from 'react'
import SingleMovie from 'modules/movies/SingleMovie';
import styled from 'styled-components';

const SingleMoviePage = () => (
  <FadePage>
    <SingleMovie />
  </FadePage>
);

export default SingleMoviePage;

// TODO: Fix transition-group for routes
const FadePage = styled.div`
  animation: appear 1s linear;
  
  @keyframes appear {
    0% {
     opacity: 0;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      opacity: 1;
    }
  }
`;
