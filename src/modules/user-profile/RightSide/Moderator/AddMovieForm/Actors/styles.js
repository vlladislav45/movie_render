import styled from 'styled-components';

export const ActorsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const ActorsRow = styled.div`
  display: flex;
  align-items: baseline;
  
  & > *:not(:first-child):not(:last-child) {
    margin: 0 4px;
  }
`;