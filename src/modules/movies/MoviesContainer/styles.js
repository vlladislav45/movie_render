import styled from 'styled-components';
import { ThemedComponent } from 'components/basic';

const DEFAULT_MOVIES_PER_ROW = 3;
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
  
  /* 16:9 aspect ratio */
  &::after {
    display: block;
    content: '';
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

export const MovieNameText = styled.p`
  font-size: 1.3rem;
  letter-spacing: 0.04rem;
  font-family: 'Marck script', cursive;
  text-align: center;
  padding: 5px 10px;
`;

export const MetaData = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 12px 16px;
`;

export const MetaDataValue = styled.p`
  font-size: 0.9rem;
`;

export const MetaDataKey = styled.p`
  font-size: 0.9rem;
`;
