import styled from 'styled-components';
import { Button } from 'components/basic';
import { DEFAULT_Z_INDEX } from 'config/zIndexes';
import {
  transitionDurations,
  transitionFunctions,
} from 'config/animationConstants';
import { applyShadow } from 'utils/colorUtils';
import { Card } from 'components';


export const SingleMovieWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  
  padding: 0 40px 20px;
  
  opacity: 0;
  ${props => props.fadeIn && `
    opacity: 1;
    transition: opacity 200ms;
  `}
  
  & > *:not(:first-child), & > *:not(:last-child) {
    margin: 20px;
  }
`;

export const MovieTitle = styled.div`
  flex: 1 1 100%;
  text-align: center;
  font-family: 'Marck script', cursive;
  font-size: 2rem;
  font-weight: bold;
  
  letter-spacing: 0.15rem;
  
  color: ${props => props.theme.onSurface};
  margin-bottom: 20px;
`;

export const MovieVideoContainer = styled.div`
  flex: 1 1 100%;
  text-align: center;
  
  & > video {
    object-fit: fill;
  }
`;

export const StyledMovieSummary = styled.div`
  position: relative;
  flex: 1 1 380px;
  height: 300px;
  padding: 5px;
  margin: 10px 0;
  font-family: 'Roboto', sans-serif;
`;

export const CardTitle = styled.h3`
  text-align: left;
  color: ${props => props.theme.onSurface};
  margin-bottom: 10px;
  font-size: 1.1rem;
`;

export const TextWrapper = styled(Card)`
  position: relative;
  text-align: justify;
  font-size: 1rem;
  letter-spacing: .6px;
  line-height: 1.4rem;
  
  color: ${props => props.theme.onSurfaceMD};
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
