import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SimilarMoviesContainer = styled.div`
  grid-area: 5 / 1 / 5 / -1;
  ${({ $oneColumn }) => $oneColumn && `
    grid-area: 7 / 1 / 8 / -1;
  `}
  width: 100%;
  height: 400px;
  overflow: hidden;
  color: ${props => props.theme.onSurface};
`;

export const MoreMoviesTitle = styled.h3`
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

export const Movies = styled.div`
  display: flex;
  scroll-snap-type: x mandatory; // TODO: figure it out
  overflow-x: auto; // TODO: Make this scrollable like genres or like a carousel
`;

export const MovieLink = styled(Link)`
  color: ${props => props.theme.onSurface};
  margin: 0 10px;
  scroll-snap-align: start;
`;

export const MovieName = styled.h4`
  font-size: 1rem;
  margin: 5px 0;
`;

export const MoviePoster = styled.img`
  width: 300px;
  height: 300px;
`;
