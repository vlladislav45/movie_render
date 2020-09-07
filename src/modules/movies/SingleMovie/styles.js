import styled from 'styled-components';
import { Card } from 'components';


export const SingleMovieWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: ${({ $oneColumn }) => $oneColumn ? `auto` : 'minmax(280px, 30%) auto'};
  grid-template-rows: min-content min-content;
  grid-auto-rows: min-content;
  grid-gap: 20px;
  
  width: ${({ $oneColumn }) => $oneColumn ? 'min-content' : '95vw'};
  margin: auto;
  padding-bottom: 50px;
  
  opacity: 0;
  ${props => props.fadeIn && `
    opacity: 1;
    transition: opacity 200ms;
  `}
`;

export const MovieTitle = styled.div`
  grid-area: 1 / 1 / 1 / -1;
  text-align: center;
  font-family: 'Marck script', cursive;
  font-size: 2rem;
  font-weight: bold;
  
  letter-spacing: 0.15rem;
  
  color: ${props => props.theme.onSurface};
  margin-bottom: 20px;
  ${props => props.$oneColumn && `
    font-size: 1.8rem;
  `};
`;

export const MovieVideoContainer = styled.div`
  grid-area: 2 / 2 / 3 / -1;
  ${props => props.$oneColumn && `
    grid-area: 2 / 1 / 3 / -1;
  `};
  text-align: center;
  
  max-width: 100%;
  & > video {
    object-fit: fill;
  }
`;

export const StyledMovieSummary = styled.div`
  grid-area: 3 / 1 / 4 / -1;
  ${({ $oneColumn }) => $oneColumn && `
    grid-area: 4 / 1 / 5 / -1;
  `};
  position: relative;
  width: 100%;
  max-height: 300px;
  margin: 10px 0;
  font-family: 'Roboto', sans-serif;
`;

export const CardTitle = styled.h3`
  text-align: left;
  color: ${props => props.theme.onSurface};
  margin-bottom: 10px;
  font-size: 1.1rem;
`;

export const SummaryCard = styled(Card)`
  position: relative;
  text-align: justify;
  font-size: 1rem;
  letter-spacing: .6px;
  line-height: 1.4rem;
  max-height: 280px;
  
  color: ${props => props.theme.onSurfaceMD};
`;