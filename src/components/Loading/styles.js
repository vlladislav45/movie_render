import styled from 'styled-components';
import { MAX_Z_INDEX } from 'config/zIndexes';
import { ReactComponent as CogWheelSVG } from 'assets/loading/cogwheel.svg';
import Logo from '../Logo';

// Position was changed to absolute, this means this should only be used inside
//  relative positioned parent
export const LoadingOuter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  --firstWidth: max(3%, 50px);
  --firstHeight: max(3%, 50px);
  --secondWidth: max(2.5%, 40px);
  --secondHeight: max(2.5%, 40px);
  --thirdWidth: max(3.5%, 55px);
  --thirdHeight: max(3.5%, 55px);
  --logoWidth: max(40%, 250px);
  --logoHeight: 150px;
  ${props => !props.$loading && `pointer-events: none;`};
`;
LoadingOuter.displayName = 'LoadingBlur';

// Check if the zIndex works properly in modals
export const LoadingInner = styled.div`
  position: relative;
  // Even above modals
  z-index: ${props => MAX_Z_INDEX - 1 + props.elevation};
  min-width: 100px;
  min-height: 50px;
  width: 100%;
  height: 100%;
  
  backdrop-filter: blur(4px);
  opacity: 1;
  ${props => !props.$loading && `
    transition: opacity .8s;
    opacity: 0;
    backdrop-filter: none;
  `};
`;
LoadingInner.displayName = 'LoadingInner';

export const LogoAndAnimationContainer = styled.div`
  position: relative;
  margin: auto;
  // width: var(--logoWidth);
  // height: calc(var(--logoHeight) + var(--thirdHeight));
  width: 100%;
  height: 100%;
  background: ${props => props.theme.surface}88;
`;

export const LoadingLogo = styled(Logo)`
  width: var(--logoWidth);
  height: var(--logoHeight);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  position: absolute;
  z-index: 1;
`;

export const CogWheelContainer = styled.div`
  position: relative;
  width: calc(var(--firstWidth) + var(--secondWidth) + var(--thirdWidth));
  height: var(--thirdHeight); // the highest height
  margin: auto;
`;

export const CogWheel = styled(CogWheelSVG)`
  position: absolute;
  display: inline-block;
  ${({ $onlyCogWheel }) => $onlyCogWheel
    ? `
      top: 5px;
    `
    : `
      top: var(--logoHeight);
    `
};
  & .stroke {
    fill: black;
  }
  & .fill {
    fill: ${({ theme }) => theme.isDark ? theme.primary : theme.secondary};
  }
 
  
  &.first {
      left: calc(40% - var(--firstWidth));
      width: var(--firstWidth);
      height: var(--firstHeight);
      animation: spin 3.8s infinite;
      animation-timing-function: linear;
  }
  
  &.second {
      left: calc((40% - var(--firstWidth)) + var(--firstWidth) - 5px);
      width: var(--secondWidth);
      height: var(--secondHeight);
      animation: spin-aclockwise 3.5s infinite;
      animation-timing-function: linear;
  }
  
  &.third {
      left: calc((40% - var(--firstWidth)) + var(--secondWidth) + var(--firstWidth) - 9px);
      width: var(--thirdWidth);
      height: var(--thirdHeight);
      animation: spin 4s infinite;
      animation-timing-function: linear;
  }
  
  @keyframes spin {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(360deg);
      }
  }
  
  @keyframes spin-aclockwise {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(-360deg);
      }
  }
`;
