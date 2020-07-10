import styled from 'styled-components';
import { Button } from 'components/basic';
import { DEFAULT_Z_INDEX } from 'config/zIndexes';
import {
  transitionDurations,
  transitionFunctions,
} from 'config/animationConstants';

const GRID_ROW_GAP = 20;
const GRID_COLUMN_GAP = 20;
export const SingleMovieWrapper = styled.div`
  display: grid;
  
  // 12 column grid system
  // grid-template-columns: repeat(12, 1fr);
  // grid-template-rows: min-content repeat(11, minmax(min-content, 1fr));
  
  
  /**
  * b - back button
  * v - video
  * t - movie title
  * s - movie summary
  * r - rating bar
  * y - movie year
  * a - actors
  * d - director
  */
  
  grid-template-areas: ". b t t t t t t ."
                       ". v v v v s s s ."
                       ". v v v v s s s ."
                       ". r . . . . . . ."
                       ". y . . . . . . ."
                       ". a . . . . . . ."
                       ". d . . . . . . ."
                       ". . . . . . . . .";
                       ". . . . . . . . .";
                       ". . . . . . . . .";
                       ". . . . . . . . .";
                       ". . . . . . . . .";
  
  
  grid-auto-rows: minmax(10px, min-content);
  grid-column-gap: ${GRID_COLUMN_GAP}px;
  grid-row-gap: ${GRID_ROW_GAP}px;
  grid-auto-flow: row;
  padding: 0 50px; // This will be for ads later on
   
  & > .movieInfo {
    display: flex;
    align-items: center;
    color: ${props => props.theme.onSurface};
    font-size: 1rem;
    margin: 10px 0;
    & > .movieInfoName {
      margin-right: 15px;
      color: ${props => props.theme.onSurfaceMD};
    }
  }
`;

export const BackArrowWrapper = styled(Button)`
  grid-area: b;
  color: ${props => props.theme.secondary};

  & > svg {
    width: 24px;
    height: 24px;
    fill: ${props => props.theme.secondary};
  }
`;

export const MovieVideo = styled.video`
  grid-area: v;
  object-fit: fill;
  max-width: 100%; // Stay inside your assigned columns biatch
`;

export const MovieTitle = styled.div`
  grid-area: t;
  grid-column-start: 1;
  font-family: 'Marck script', cursive;
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 0.15rem;
  
  display: grid;
  & > p {
    align-self: end;
    text-align: center;
  }
  
  color: ${props => props.theme.onSurface}
`;

// TODO: make text appear gradually
export const StyledMovieSummary = styled.div`
  grid-area: s;
  font-family: 'Roboto', sans-serif;
  
  // Text may overflow, container shouldn't
  // overflow: hidden;
  // max-height: 100%;

  // stay above other elements, so when expanded its on top of the stack
  z-index: ${DEFAULT_Z_INDEX + 1};
  
  & > #title {
    text-align: left;
    color: ${props => props.theme.onSurface};
    margin-bottom: 10px;
    font-size: 1.1rem;
  }
  
  transition: all ${transitionDurations.largeExpand}ms ${transitionFunctions.acceleratedEasing};
  ${props => props.isExtended && `
     transition: all ${transitionDurations.largeCollapsing}ms ${transitionFunctions.deceleratedEasing};
     background: ${props.theme.surface};
     transform: translateX(${-(props.videoCoordinates.width + GRID_ROW_GAP + 5)}px);  
     width: calc(100% + ${props.videoCoordinates.width}px);
  `};
`;

export const ReadMore = styled(Button)`
  color: ${props => props.theme.secondary};
`;

export const TextWrapper = styled.div`
  text-align: justify;
  font-size: 1rem;
  letter-spacing: .6px;
  line-height: 1.5rem;
  
  color: ${props => props.theme.onSurfaceMD};
  max-height: calc(${props => props.videoCoordinates.height}px - 5rem);
  overflow-y: auto;
  
  transition: all .2s;
  ${props => props.isExtended && `
    height: auto;
    line-height: 1.7rem;
    font-size: 1.1rem;
    color: ${props.theme.onSurface};
  `};  
`;

export const MovieRating = styled.div`
  grid-area: r;
`;

export const MovieYear = styled.div`
  grid-area: y;
  display: flex;
`;

export const MovieActors = styled.div`
  grid-area: a;
  display: flex;

`;

export const MovieDirector = styled.div`
  grid-area: d;
  display: flex;
`;
