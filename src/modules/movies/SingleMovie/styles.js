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
  * w - vieWs
  * m - more movies like this (SimilarMovies)
  */
  
  grid-template-areas: ". b t t t t t t ."
                       ". v v v s s s s ."
                       ". v v v s s s s ."
                       ". r r w w . . . ."
                       ". y y d d . . . ."
                       ". a a a a a a a ."     
                       ". . . . . . . . ."
                       ". m m m m m m m ."
                       ". m m m m m m m .";
                       ". . . . . . . . .";
                       ". . . . . . . . .";
                       ". . . . . . . . .";
                       ". . . . . . . . .";
  
  
  grid-auto-rows: minmax(10px, min-content);
  grid-auto-columns: 1fr;
  grid-template-columns: repeat(9, 1fr);
  
  grid-column-gap: ${GRID_COLUMN_GAP}px;
  grid-row-gap: ${GRID_ROW_GAP}px;
  grid-auto-flow: row;
  // padding: 0 50px; // This will be for ads later on
   
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
  grid-column-start: 2;
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

export const StyledMovieSummary = styled.div`
  grid-area: s;
  position: relative;
  
  // stay above other elements, so when expanded its on top of the stack
  z-index: ${DEFAULT_Z_INDEX + 1};
  font-family: 'Roboto', sans-serif;
  
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
  float: right;
  position: sticky;
  right: 0;
  top: 10px;
  color: ${props => props.theme.secondary};
`;

export const TextWrapper = styled.div`
  position: relative;
  text-align: justify;
  font-size: 1rem;
  letter-spacing: .6px;
  line-height: 1.4rem;
  
  color: ${props => props.theme.onSurfaceMD};
  // Video height - text size of #title (1.1rem) - bottom margin of #title (10px)
  max-height: calc(${props => props.videoCoordinates.height}px - 1.1rem - 10px);
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  
  transition: all .3s;
  ${props => props.isExtended && `
    padding-top: 10px;
    height: auto;
    font-size: 1.1rem;
    line-height: 1.5rem;
    color: ${props.theme.onSurface};
    max-height: ${props.videoCoordinates.height + 250}px;
  `};  
`;

export const MovieRating = styled.div`
  grid-area: r;
`;

export const MovieYear = styled.div`
  grid-area: y;
`;

export const MovieActors = styled.div`
  grid-area: a;
  & > .actors {
    display: flex;
    flex-wrap: wrap;
    & > .actor {
      margin: 0 5px;
      white-space: nowrap;
    }
  }

`;

export const MovieDirector = styled.div`
  grid-area: d;
`;

export const MovieViews = styled.div`
  grid-area: w;
`;
