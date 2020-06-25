import styled from 'styled-components';
import { ThemedComponent } from 'components/basic';


export const SingleMovieWrapper = styled.div`
  display: grid;
  
  // 12 column grid system
  grid-template-columns: repeat(12, 1fr);
  grid-row-gap: 30px;
`;

export const BackArrowWrapper = styled(ThemedComponent)`
  grid-column: 2 / 3;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  padding: 5px 10px 5px 7px;
  color: ${props => props.theme.secondary};
  font-family: 'Lato', sans-serif;
  
  & > svg {
    width: 24px;
    height: 24px;
    fill: ${props => props.theme.secondary};
  }
`;

export const MovieVideo = styled.video`
  grid-column: 2 / 12;
  max-width: 100%;
  object-fit: fill;
`;

export const MovieTitle = styled.div`
  grid-column: 6 / 8;
  text-align: center;
  font-family: 'Marck script', cursive;
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 2px;
`;

export const MovieSummary = styled.div`
  grid-column: 2 / 12;
  
  font-family: 'Roboto', sans-serif;
  text-align: justify;
  font-size: 1rem;
  text-overflow: ellipsis;
  overflow: hidden;
  text-wrap: wrap;
  letter-spacing: .7px;
  line-height: 28px;
`;

export const MovieData = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 12px 16px;
`;

export const MovieDataValue = styled.p`
  font-size: 0.9rem;
`;

export const MovieDataKey = styled.p`
  font-size: 0.9rem;
`;
