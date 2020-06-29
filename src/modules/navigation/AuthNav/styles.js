import styled from 'styled-components';


export const LoggedInNav = styled.div`
`;

export const AnonymousNav = styled.div`
  display: flex;
  // flex-direction: column;
  
  align-items: flex-end;
  & > * {
    margin: 10px 5px;
  }
  
  & >:last-child {
    margin-right: 0;
  }
`;
