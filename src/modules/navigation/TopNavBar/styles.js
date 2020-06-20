import styled from 'styled-components';
import { ThemedComponent } from 'components/basic';
import { XS_SM, SM, M } from 'utils/mediaUtils';


export const StyledTopNav = styled(ThemedComponent)`
    ${({ theme: { primary, isDark }, device }) => {
  const darkSurfaceWithPrimary = '#1f1b24';
  return `
            position: relative;
            width: 100%;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(0, auto));
            grid-auto-rows: minmax(0px, auto);
            grid-row-gap: 30px;
            grid-template-areas: "logo title title title auth auth"
                                 ". . . . search search"
                                 "genres genres genres genres genres genres";
                              
             ${(device === XS_SM || device === SM) && `
                ${device === XS_SM && `
                  grid-template-areas: "logo title title" 
                                      "auth auth auth"
                                      "search search search"
                                      "genres genres genres";
                `};
                ${device === SM && `
                  grid-template-areas: "logo title title" 
                                      "search search auth"
                                      "genres genres genres";
                `};
                
                & > #title {
                  justify-self: left;
                }
             `};    
                                  
            
            & > #logo {
              grid-area: logo;
            }
            & > #title {
              grid-area: title;
              align-self: center;
            }
            & > #auth-nav {
              grid-area: auth;
              align-self: center;
            }
            & > #genres {
              grid-area: genres;
            }
            & > #search-bar {
              grid-area: search;
            }
            
            padding: 48px 24px;
            background:  ${isDark ? darkSurfaceWithPrimary : primary};
            z-index: 999;
        `;
}
}
`;
