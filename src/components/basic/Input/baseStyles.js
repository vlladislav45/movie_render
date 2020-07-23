import styled from 'styled-components';
import { ReactComponent as ErrorSvg } from 'assets/icons/error.svg';
import {
  transitionDurations,
  transitionFunctions,
} from 'config/animationConstants';
import { NORMAL_Z_INDEX } from 'config/zIndexes';

export const BaseInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 1rem;
`;

export const BaseLabel = styled.label`${props => {
  const { primary, error, secondary, onSurface } = props.theme;
  const { elevated, withLeadingIcon, hasError, isFocused, isOnPrimary } = props;
  const accentColor = isOnPrimary ? secondary : primary;
  return `
    position: absolute;
    left: 16px;
    top: 20px;
    font-size: 1rem;
    font-family: 'Roboto', sans-serif;
    line-height: 1.15rem;
    user-select: none;
    z-index: ${NORMAL_Z_INDEX + 1};
    color: ${onSurface};
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
      transform: translateY(-90%) scale(0.75);
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

export const OuterContainer = styled.div`
  position: relative;
  ${props => props.isMultiLine && 'height: 100%'};
  
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
  
  // Helper and error text
  & > p {
    font-family: 'Roboto', sans-serif; 
    padding-left: 16px;
    height: 16px;
    align-self: bottom;
    font-size: 0.75rem;
    letter-spacing: 0.03rem;
    margin: 2px 0;
  }
`;

export const HelperText = styled.p`
  color: ${props => props.theme.onSurface};
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
