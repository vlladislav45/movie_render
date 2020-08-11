import styled from 'styled-components';
import { Card } from 'components';

export const GenresContainer = styled.div`
  flex: 1 1 content;
  height: 100px;
`;


export const GenresCard = styled(Card)`
  display: flex;
  flex-wrap: wrap;
  
  & > * {
    margin: 10px;
  }
`;