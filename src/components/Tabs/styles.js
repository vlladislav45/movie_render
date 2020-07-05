import styled, { css, keyframes } from 'styled-components';
import { NORMAL_Z_INDEX } from 'config/zIndexes';
import { applyShadow, getOverlay } from 'utils/colorUtils';
import { rippleConstants } from 'config/constants';

const { SMALL_RIPPLE_DURATION } = rippleConstants;

export const TabsContainer = styled.div`${props => {
  const { prominent, color, theme, activeTab } = props;
  const onColor = theme[`on${color.charAt(0).toUpperCase() + color.slice(1)}`];
  let left = 0, width = 0;
  if (activeTab && activeTab.current) {
    left = activeTab.current.offsetLeft;
    width = activeTab.current.offsetWidth;
  } 
  
  return `
    display: flex;
    align-items: center;
    min-height: 48px;
    position: relative;
    width: max-content;
    
    &:focus {
      box-shadow: ${applyShadow(6)};
      outline: none;
    }
    
    ${prominent && `
      background: ${theme[color]};
    `};
    
    &::before {
      will-change: width, left;
      z-index: ${NORMAL_Z_INDEX};
      transition: left .2s ease;
      content: '';
      width: ${width}px;
      height: 2px;
      background: ${prominent ? onColor : theme[color]};
      left: ${left}px;
      bottom: 0;
      position: absolute;
    }
  `;
}}
`;


export const StyledSingleTab = styled.div`${props => {
  const { isActive, ripple, prominent, color, theme, rippleOff } = props;
  
  const rippleActive = !!ripple;
  const { x, y } = ripple || {};
  
  const themedColor = theme[color];
  const onColor = theme[`on${color.charAt(0).toUpperCase() + color.slice(1)}`];
  
  
  const hoverColor = prominent
    ? getOverlay(themedColor, theme.overlay, 0.08, true)
    : getOverlay(theme.surface, theme.contrast, 0.04, true);

  const focusColor = prominent
    ? getOverlay(themedColor, theme.overlay, 0.24, true)
    : getOverlay(theme.surface, themedColor,  0.12, true);

  return `
    position: relative;
    overflow: hidden;
    height: 100%;
    text-transform: uppercase;
    text-align: center;
    font-size: 0.875rem;
    font-family: 'Roboto', sans-serif;
    letter-spacing: 1.25px;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    transition: color .3s ease;
    padding: 15px 24px;
    color: ${prominent ? onColor + 'BB' : theme.onSurface};

    &:hover {
      background: ${hoverColor};
    }

    &:focus {
      outline: none;
      background: ${focusColor};
      &:hover {
        background: ${getOverlay(focusColor, prominent ? theme.overlay : theme.contrast, 0.04)};
      }
    }


     ${isActive && `
      color: ${prominent ? onColor : themedColor};
      &:hover {
        background: ${prominent && getOverlay(hoverColor, theme.overlay, 0.04)};
      }
      &:focus {
        background: ${prominent && getOverlay(focusColor, theme.overlay, 0.12)};
      }
      &:after {
        ${rippleActive && prominent && 'minOpacity: 0.16!important'};
      }
    `};

    &:after {
     position: absolute;
     content: "";
     width: 10px;
     height: 10px;
     left: ${x}px;
     top: ${y}px;
     border-radius: 50%;
     opacity: 0;
     pointer-events: none; 
     background: ${prominent ? theme.overlay : themedColor};
     ${rippleOff && `
      animation: rippleOff 250ms linear!important;
     `};
     ${rippleActive && `animation: rippleOn ${SMALL_RIPPLE_DURATION}ms linear forwards!Important`};

   }
   
   @keyframes rippleOn {
    0% {
      will-change: transform, opacity;
      opacity: 0;
      transform: scale(0);
    }
    20% {
      opacity: ${prominent ? 0.32 : 0.24};
      transform: scale(5);
    }
    100% {
      will-change: unset;
      opacity: ${prominent ? 0.32 : 0.24};
      transform: scale(30);
    }
   }
   
   @keyframes rippleOff {
    0% {
      will-change: transform, opacity;
      opacity: ${prominent ? 0.32 : 0.24};
      transform: scale(30);
    }
    50% {
      opacity: 0.10;
      transform: scale(27);
    }
    100% {
      will-change: unset;
      opacity: 0;
    }
  }
  `;
}}
`;

