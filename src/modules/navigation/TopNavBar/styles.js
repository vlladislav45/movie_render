import styled from 'styled-components';
import { ThemedComponent } from 'components/basic';


export const StyledTopNav = styled(ThemedComponent)`
    ${({ theme: { primary } }) => {
  return `
            display: flex;
            flex-wrap: wrap;
            padding: 50px;
            background:  ${primary};
            
            // Logo
            & > :nth-child(1) {
              flex-grow: 1;
            }
            
            // Title
            & > :nth-child(2) {
              flex-grow: 4;
            }
            
            // AuthNav
            & > :nth-child(3) {
              flex-grow: 1;
              align-self: center;
            }
        `;
}
}
`;
