import styled from 'styled-components';

export const MetaDataContainer = styled.div`
  width: 48%;
  display: flex;
  flex-direction: column;
  
  & > *:not(:last-child):not(:first-child) {
    margin: 10px 0;
  }
  
  & > * {
    flex: 1 1 0;
  }
`;
