import styled from 'styled-components';
import { ThemedComponent } from 'components/basic';

const DEFAULT_MOVIES_PER_ROW = 5;
const DEFAULT_SPACE_BETWEEN_MOVIE = 30;
export const StyledMoviesContainer = styled.div`
  width: 80%;
  margin: 30px auto;
  display: flex;
  flex-wrap: wrap;
`;

export const SingleMovie = styled(ThemedComponent)`
  ${props => {
    const count = props.moviesPerRow || DEFAULT_MOVIES_PER_ROW;
    const space = props.spaceBetweenMovies || DEFAULT_SPACE_BETWEEN_MOVIE;
    return `
      margin: 20px ${space}px 0 0;
      width: calc(1/${count}*100% - (1 - 1/${count})*${space}px);
      
      &:nth-child(${count}n) {
        margin-right: 0;
      }
      
      &:nth-child(-n+${count}) {
          margin-top: 0;
      }
    `
  }}
`;

export const PosterContainer = styled.div`
  position: relative;
  
  &::after {
    display: block;
    content: '';
    /* 16:9 aspect ratio */
    padding-bottom: 62.55%;
  }
`;

export const MoviePoster = styled.img`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
`;
