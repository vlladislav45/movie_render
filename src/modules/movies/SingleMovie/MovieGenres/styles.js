import styled from 'styled-components';
import { Card } from 'components';

export const GenresContainer = styled.div`
  ${props => props.$oneColumn
    ? `
      grid-area: 5 / 1 / 6 / -1;
    `
    : `
      grid-area: 4 / 1 / 5 / 1;
      height: 200px;
  `};
  max-height: 200px;
`;


export const GenresCard = styled(Card)`
  display: flex;
  flex-wrap: wrap;
  height: 90%;
  
  & > * {
    margin: 0 3px;
  }
`;