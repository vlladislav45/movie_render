import styled from 'styled-components';
import { ThemedComponent } from 'components/basic';


export const StyledTopNav = styled(ThemedComponent)`
    ${({ theme: { primary } }) => {
  return `
            position: relative;
            display: flex;
            flex-wrap: wrap;
            padding: 50px;
            background:  ${primary};
            z-index: 999;
            
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
