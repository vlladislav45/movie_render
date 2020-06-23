import styled from 'styled-components';

export const AuthNavContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 9999;
  
  & > .auth {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
`;

