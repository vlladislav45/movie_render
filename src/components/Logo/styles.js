import styled from 'styled-components';
import { ReactComponent as Logo } from 'assets/logo/robot_logo.svg';


export const StyledLogo = styled(Logo)`
  // Text
  & g#textLayer > g#textLayerInner > path {
    ${({ theme, $textColor }) => $textColor && `
      fill: ${theme[$textColor]}!important;
    `};
  }
  
  // Robot
  & g#robotLayer > .fill {
    ${({ theme, $robotColor }) => $robotColor && `
      fill: ${theme[$robotColor]}!important;
    `};
  }
  & g#robotLayer > .stroke {
    ${({ theme, $robotColor }) => $robotColor && `
      stroke: ${theme[$robotColor]}!important;
    `};
  }
`;