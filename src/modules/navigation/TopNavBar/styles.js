import styled from 'styled-components';
import { ThemedComponent } from 'components/basic';


export const StyledTopNav = styled(ThemedComponent)`
    ${({ theme: { primary } }) => {
  return `
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 50px;
            background:  ${primary};
            
            // Logo
            & > :nth-child(1) {
              width: 5%;
            }
            
            // Title
            & > :nth-child(2) {
              width: 50%;
            }
            
            // AuthNav
            & > :nth-child(3) {
              width: 45%;
            }
        `;
}
}
`;
