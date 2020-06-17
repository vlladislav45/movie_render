import styled from 'styled-components';
import { ThemedComponent } from 'components/basic';


export const StyledTopNav = styled(ThemedComponent)`
    ${({ theme: { primary, surface }, isDark }) => {
  return `
            position: relative;
            display: flex;
            flex-wrap: wrap;
            padding: 48px 24px;
            background:  ${isDark ? '#1f1b24' : primary};
            z-index: 999;
            
            // Logo
            & > :nth-child(1) {
              flex-shrink: 1;
            }
            
            // Title
            & > :nth-child(2) {
              flex-grow: 1;
              align-self: center;
            }
            
            // AuthNav
            & > :nth-child(3) {
              flex-shrink: 1;
              align-self: center;
            }
        `;
}
}
`;
