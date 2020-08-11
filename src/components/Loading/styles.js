import styled from 'styled-components';
import { MAX_Z_INDEX } from '../../config/zIndexes';

// Position was changed to absolute, this means this should only be used inside
//  relative positioned parent
const cogWheel = require('../../assets/loading/loading-img.png');
export const LoadingOuter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;
// Check if the zIndex works properly in modals
export const LoadingInner = styled.div`
  position: relative;
  // Even above modals
  z-index: ${props => MAX_Z_INDEX - 1 + props.elevation};
  background: ${props => props.theme.surface}66;
  backdrop-filter: blur(6px);
  min-width: 100px;
  min-height: 50px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  opacity: 1;
  ${props => !props.$loading && `
    transition: opacity 700ms;
    opacity: 0;
  `};
`;

export const CogWheel = styled.div`
  position: absolute;
  display: inline-block;
  background: url("${cogWheel}") no-repeat;
  background-size: contain;
  
  &.first {
      left: calc(47% - 50px);
      width: 50px;
      height: 50px;
      animation: spin 5s infinite;
      // animation-duration: 5s;
      animation-timing-function: linear;
  }
  
  &.second {
      left: calc((47% - 50px) + 47px);
      width: 40px;
      height: 40px;
      animation: spin-aclockwise 3s infinite;
      animation-duration: 3s;
      animation-timing-function: linear;
  }
  
  &.third {
      left: calc((47% - 50px) + 82px);
      width: 35px;
      height: 35px;
      animation: spin 3.5s infinite;
      animation-duration: 3.5s;
      animation-timing-function: linear;
  }
  
  @keyframes spin {
      from {
          transform: rotate(0);
      }
      to {
          transform: rotate(360deg);
      }
  }
  
  @keyframes spin-aclockwise {
      from {
          transform: rotate(-12 deg);
      }
      to {
          transform: rotate(-372deg);
      }
  }
`;
