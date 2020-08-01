import styled from 'styled-components';
import { applyShadow } from 'utils/colorUtils';
import { FULL_HD, L, M, SM, XL, XS_SM } from 'utils/mediaUtils';
import { ThemedComponent } from 'components/basic';
import { VERY_HIGH_Z_INDEX } from 'config/zIndexes';

export const StyledTopNav = styled(ThemedComponent)`
    ${({ theme: { primary, secondary, isDark }, device }) => {
      
  return `
            position: relative;
            width: 100%;
            padding: 48px 24px;
            background:  ${isDark ? '121212' : primary};
            z-index: ${VERY_HIGH_Z_INDEX};
            // We dont need anything positioned right below it
            margin-bottom: 30px;
            
             & ::selection {
               background: ${secondary}66;
             }
            
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(0, auto));
            grid-auto-rows: minmax(0px, auto);
            grid-column-gap: 10px;
            
             ${device === XS_SM && `
                grid-template-areas: "logo title title" 
                                      "auth auth auth"
                                      ". search search"
                                      "genres genres genres";
                & > #title {
                  justify-self: left;
                  align-self: center;
                }
                
                & > #search-bar {
                  align-self: end;                  
                }
             `};
             ${device === SM && `
                grid-template-columns: min-content 1fr 1fr min-content;
                grid-template-areas: "logo title title title title" 
                                      "search search search . auth"
                                      "genres genres genres genres genres";
                  
                & > #search-bar {
                  align-self: end;
                }
                  
                & > #title {
                  align-self: center;
                  justify-self: center;
                }
             `};
             
             ${device === M && `                
                grid-template-areas: "logo title title auth auth" 
                                      ". . . search search"
                                      "genres genres genres genres genres";
                & > #title {
                  align-self: center;
                }                                      
             `};
             
             ${device === L && `
                grid-template-areas: "logo title title title auth auth"
                                       ". . . . search search"
                                       "genres genres genres genres genres genres";
                & > #auth {
                  align-self: end;
                }
                & > #title {
                  align-self: center;
                }                                           
             `};
             
             ${device === XL && `
                grid-template-columns: min-content 2fr 2fr 1fr min-content;                
                grid-template-areas: "logo title title search search"
                                       "genres genres genres genres auth";
                & > #search-bar {
                  align-self: center;
                }
                & > #title {
                  align-self: center;
                  justify-self: center;
                }                                       
             `};
             
              ${device === FULL_HD && `
                  grid-template-areas: "logo title title title auth auth"
                                       "genres genres genres genres genres search";
                  & > * {
                    align-self: center;
                  }
                  & > #title {
                    justify-self: center;
                  }                                    
              `};                 
                                  
            
            & > #logo {
              grid-area: logo;
            }
            & > #title {
              grid-area: title;
            }
            & > #auth-nav {
              grid-area: auth;
              justify-self: flex-end;
              align-self: center;
            }
            & > #genres {
              grid-area: genres;
            }
            & > #search-bar {
              grid-area: search;
            }
`;
}}`;
