import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  
  & > * {
    margin: 4px;
  }
`;