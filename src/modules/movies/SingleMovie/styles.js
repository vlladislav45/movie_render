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
  * i - more info (actors, rating, views etc)
  * m - more movies like this (SimilarMovies)
  */
  
  grid-template-areas: ". b t t t t t t ."
                       ". v v v s s s s ."
                       ". v v v s s s s ."
                       ". i i i i i i i ."
                       ". i i i i i i i ."
                       ". i i i i i i i ."     
                       ". . . . . . . . ."
                       ". m m m m m m m ."
                       ". m m m m m m m ."
                       ". . . . . . . . .";
                       ". . . . . . . . .";
                       ". . . . . . . . .";
                       ". . . . . . . . .";
  
  
  grid-auto-rows: minmax(10px, min-content);
  grid-auto-columns: 1fr;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, minmax(min-content,max-content));
  
  grid-column-gap: ${GRID_COLUMN_GAP}px;
  grid-row-gap: ${GRID_ROW_GAP}px;
  grid-auto-flow: row;
   
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
  grid-column-start: 3;
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

export const MoreInfoGrid = styled.div`
  grid-area: i;
  max-width: 100%;
  display: grid;
  grid-column-gap: 30px; // There is padding-right in .movieInfo
  grid-row-gap: 15px;
  grid-template-columns: repeat(4, minmax(min-content, max-content));
  grid-template-areas: "nr ir nv iv ."
                       "ny iy nd id ."
                       "na ia ia ia ia";
                       
  align-items: center;                 
                       
                       
  & .movieInfo {
    white-space: nowrap;
    color: ${props => props.theme.onSurface};
    font-size: 1.1rem;
    padding-right: 20px; //This may cause problems
  }
  
  & .movieInfoName {
    white-space: nowrap;
    font-size: 1.1rem;
    color: ${props => props.theme.onSurfaceMD};
  }
                         
  & > .movieInfoName.rating {
    grid-area: nr;
  }
  
  & > .movieInfo.rating {
    grid-area: ir;
    margin-left: -5px; // little hack to compensate for star svg white space
    & > #movieRating {
      justify-content: unset;
    }
  }
  
  & > .movieInfoName.views {
    grid-area: nv;
  }
  
  & > .movieInfo.views {
    grid-area: iv;
  }
  
    & > .movieInfoName.director {
    grid-area: nd;
  }
  
  & > .movieInfo.director {
    grid-area: id;
  }
  
  & > .movieInfoName.year {
    grid-area: ny;
  }
  
  & > .movieInfo.year {
    grid-area: iy;
  }
  
  & > .movieInfoName.actors {
    grid-area: na;
  }
  
  & > .movieInfo.actors {
    grid-area: ia;
    & > ul {
      display: flex;
      flex-wrap: wrap;
      & > li.actor {
        &:not(:first-child):not(:last-child) {
          margin: 0 6px;
        }
        &:first-child {
          margin-right: 6px;
        }
        &:last-child {
          margin-left: 6px;
        }
      }
    }
  }
`;
