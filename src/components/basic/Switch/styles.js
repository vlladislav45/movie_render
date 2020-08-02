import styled from 'styled-components';
import { applyShadow, getOverlay } from 'utils/colorUtils';
import { transitionDurations, transitionFunctions } from 'config/animationConstants';

export const RIPPLE_STATE = {
  INITIAL: 0,
  RIPPLE_ON: 1,
  RIPPLE_OFF: 2,
}

export const SwitchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 36px;
  height: 20px;
  cursor: pointer;
`;

export const SwitchTrack = styled.div`
  position: absolute;
  height: 16px;
  width: 32px;
  left: 4px;
  border-radius: 20px;
  background: ${({ theme }) => getOverlay(theme.contrast, theme.surface, 0.67)};
  ${props => props.$isChecked && `
    background: ${props.theme[props.color]};
    opacity: 0.33;
  `};
`;

const RIPPLE_ANIMATIONS = {
  [RIPPLE_STATE.INITIAL]: 'none',
  [RIPPLE_STATE.RIPPLE_ON]: 'expandRipple',
  [RIPPLE_STATE.RIPPLE_OFF]: 'rippleFade',
}
export const SwitchThumb = styled.div`
  position: absolute;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  box-shadow: ${applyShadow(2)};
 
  transition: transform ${transitionDurations.smallArea}ms ${transitionFunctions.standardEasing};
  
  background: ${props => props.theme.surface};
  ${props => props.$isChecked && `
    transform: translateX(100%);
    background: ${props.theme[props.color]};
  `};
  
  
  &:before, &:after {
      position: absolute;
      border-radius: 50%;
      content: '';
      opacity: 0;
      z-index: -1;
  }
    
  &:before {
    left: -75%;
    top: -75%;
    background: ${props => props.$isChecked ? props.theme[props.color] : props.theme.contrast};
    width: calc(20px * 2.5); //base width times scale
    height: calc(20px * 2.5); //base height times scale
  }
    
  &:after {
    opacity: 1;
    width: 20px;
    height: 20px;
    ${props => props.$rippleState === RIPPLE_STATE.RIPPLE_ON && `
      opacity: 0.24;
      background: ${props.$isChecked ? props.theme[props.color] : props.theme.contrast};
    `}
    animation: ${props => `${RIPPLE_ANIMATIONS[props.$rippleState]} ${transitionDurations.mediumExpand}ms forwards`};
  }
    
  &:focus, &:focus-within {
    border: 0;
    outline: 0;
  }
 
  &:focus:before {
    opacity: 0.12;
  }
  
  &:hover:not(:focus):before {
    opacity: 0.04;
  }
  
  @keyframes expandRipple {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(2.5);
    }
  }
  
  @keyframes rippleFade {
    from {
      transform: scale(2.5);
    }
    to {
      opacity: 0;
    }
  }
`;

export const SwitchInput = styled.input``;