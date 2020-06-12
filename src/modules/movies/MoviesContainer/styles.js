import styled from 'styled-components';
import { ThemedComponent } from 'components/basic';

export const StyledMoviesContainer = styled.div`
  width: 80%;
  margin: 30px auto;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const SingleMovie = styled(ThemedComponent)`
  margin-top:10px;
  width: 30%;
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