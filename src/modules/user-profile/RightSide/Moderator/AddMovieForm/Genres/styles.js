import styled from 'styled-components';

export const GenresWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;  
`;

export const GenresRow = styled.div`
  display: flex;
  align-items: baseline;
  
  & > *:not(:first-child):not(:last-child) {
    margin: 0 4px;
  }

`;