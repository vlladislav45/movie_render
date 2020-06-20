import styled from 'styled-components';
import { ThemedComponent } from 'components/basic';
import {
  MOVIES_PER_PAGE,
  SINGLE_MOVIE_HEIGHT,
} from 'config/MoviesConfig';

const COLUMNS = 3;
const ROWS = Math.ceil(MOVIES_PER_PAGE / COLUMNS);
const height = ROWS * SINGLE_MOVIE_HEIGHT;
export const StyledMoviesContainer = styled.div`
  width: 80%;
  height: ${height}px;
  margin: 30px auto;
  
  display: grid;
  grid-template-columns: repeat(${COLUMNS}, 1fr);
  grid-template-rows: min-content repeat(${ROWS}, auto);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  
  // Pagination
  & > :nth-child(1) {
    grid-column: span ${COLUMNS};
    grid-row: auto;
  }
  
  & > .loading-container {
    grid-column: span ${COLUMNS};
    grid-row: span ${ROWS};
  }
`;

export const SingleMovie = styled(ThemedComponent)`
  
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
