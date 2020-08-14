import styled from 'styled-components';
import { lessThen, M } from 'utils/mediaUtils';
import {
  transitionDurations,
  transitionFunctions,
} from 'config/animationConstants';
import { NORMAL_Z_INDEX } from 'config/zIndexes';
import { ReactComponent as ErrorSvg } from 'assets/icons/error.svg';


export const OuterContainer = styled.div`
  --belowHeight: 16px;
  --inputHeight: 48px;
  position: relative;
  font-size: ${({ $device }) => lessThen($device, M) ? '0.9rem' : '1rem'};
  ${({ $withBelowText }) => $withBelowText
  ? `
    height: calc(var(--inputHeight) + var(--belowHeight) + 5px);
    min-height: calc(var(--inputHeight) + var(--belowHeight) + 5px);
  `
  : `
    height: var(--inputHeight);
    min-height: var(--inputHeight);
  `};
  
  ${props => props.isMultiLine && `
    min-height: 200px;
  `};
  
  // Overlay
  ${props => props.isDisabled && `
      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: ${props.theme.overlay};
        opacity: 0.38;
        z-index: ${NORMAL_Z_INDEX + 1};
      }
      & label {
        color: ${props.theme.disabled}!important;
      }
  `}
  
  // Helper and error text; Character count
  & > p {
    position: absolute;
    bottom: 0;
    font-family: 'Roboto', sans-serif;
    padding-left: 16px;
    height: var(--belowHeight);
    font-size: 0.75em;
    letter-spacing: 0.03em;
  }
`;

export const BaseInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 1em;
  min-height: 48px;
  height: var(--inputHeight);
`;

export const BaseLabel = styled.label`${props => {
  const { primary, error, secondary, onSurfaceMD } = props.theme;
  const { elevated, withLeadingIcon, hasError, isFocused, isOnPrimary } = props;
  const accentColor = isOnPrimary ? secondary : primary;
  return `
    position: absolute;
    left: 16px;
    top: 20px;
    height: 20px;
    height: min-content;
    font-size: 1em;
    font-family: 'Roboto', sans-serif;
    line-height: 1.15em;
    user-select: none;
    z-index: ${NORMAL_Z_INDEX + 1};
    color: ${onSurfaceMD};
    pointer-events: none;
    
    transform-origin: left top;
    transition: transform ${transitionDurations.smallArea}ms ${transitionFunctions.deceleratedEasing};

    ${isFocused && `
      color: ${accentColor}
    `};
    
    ${withLeadingIcon && `
      left: 48px;
    `};
    
    ${elevated && `
      transition: transform ${transitionDurations.smallArea}ms ${transitionFunctions.acceleratedEasing},
                  color ${transitionDurations.smallArea}ms ${transitionFunctions.acceleratedEasing};
      transform: translateY() scale(0.75);
    `};
    
    ${hasError && `
      color: ${error};
      ${elevated && `
        animation: shake ${transitionDurations.mediumExpand}ms;
      `};
      
      @keyframes shake {
        0% {
          transform: translateY(-90%) scale(0.75) translateX(0);
        }
        50% {
          transform: translateY(-90%) scale(0.75) translateX(-15px);
        }
        100% {
          transform: translateY(-90%) scale(0.75) translateX(15px);
        }
      }
      
    `};
  `
}};
`;

export const CharacterCount = styled.p`
  right: 0;
  color: ${props => props.theme.onSurfaceMD};
`;

export const HelperText = styled.p`
  color: ${props => props.theme.onSurfaceMD};
`;

export const ErrorText = styled.p`
  color: ${props => props.theme.error}!important;
`;

export const ErrorIcon = styled(ErrorSvg)`
  position: absolute;
  right: 12px;
  fill: ${props => props.theme.error};
  align-self: center;
`;

export const RippleElem = styled.span`
  box-sizing: content-box;
  position: absolute;
  left: 50%;
  height: 100%;
  pointer-events: none;
  // Stay above the input element
  z-index: ${NORMAL_Z_INDEX + 1};
  
  ${({ theme, hasError, isOnPrimary }) => {
  const accentColor = isOnPrimary ? theme.secondary : theme.primary;
  const color = hasError ? theme.error : accentColor;
  return `
    border-bottom: 2px solid ${color};
  
    &.activate {
      animation-name: ripple;
      animation-duration: ${transitionDurations.smallArea}ms;
      animation-timing-function: ${transitionFunctions.acceleratedEasing};
      animation-fill-mode: forwards;
      
      &:after {
        position: absolute;
        height: 100%;
        width: 100%;
        content: '';
        background: ${color};
        opacity: 0.08;
      }
    }
  `;
}};
  
  @keyframes ripple{
    0% {
      will-change: width, left;
      width: 0%;
      left: 50%;
    }
    100% {
      will-change: unset;
      width: 100%;
      left: 0;
    }
  }
`;
