import styled from 'styled-components';
import { applyShadow, getOverlay, hexToRgb } from 'utils/colorUtils';
import { rippleConstants } from 'config/animationConstants';

const { SMALL_RIPPLE_DURATION } = rippleConstants;

export const LeadingIcon = styled.span`
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 8px;
  
  & > svg {
    width: 1.2rem;
    height: 1.2rem;  
  }
`;

export const ButtonWrapper = styled.div`
  display: inline-flex;
  width: auto;
  position: relative;
  height: 36px;
  min-height: 36px;
  align-items: center;
`;

export const BaseButton = styled.button`${props => {
  const { isActive, withIcon, coordinates = {} } = props;
  const { x, y } = coordinates;
  return `
    transition: all .3s ease;
    display: flex;
    align-items: center;
    width: auto;
    justify-content: center;
    height: 100%;
    min-width: 4rem;
    padding: 0 16px;
    ${withIcon && 'padding: 0 16px 0 12px'};
    outline: none;
    border: none;
    text-transform: uppercase;
    border-radius: 4px;
    font-size: 0.875rem;
    font-family: 'Roboto', sans-serif;
    letter-spacing: 1.25px;
    white-space: nowrap;
    background: none; 
    
    position: relative;
    overflow: hidden;
    cursor: pointer;
    
    &:after {
     position: absolute;
     content: "";
     width: 5px;
     height: 5px;
     left: ${x}px;
     top: ${y}px;
     border-radius: 50%;
     opacity: 0;
     pointer-events: none;
     ${isActive && `
       animation: doRipple ${SMALL_RIPPLE_DURATION + 20}ms linear forwards;
       opacity: 1;
     `};
   }
   
   @keyframes doRipple {
     from {
      transform: scale(0);
     }
     to {
       transform: scale(60);
     }
   }

  `;
}}
`;

export const ContainedButton = styled(BaseButton)`${props => {
  const { theme, color, disabled, isActive } = props;
  const textColor = theme[`on${color.charAt(0).toUpperCase() +
  color.slice(1)}`];
  const backgroundColor = theme[color];

  return `
    box-shadow: ${applyShadow(2)};
    background: ${backgroundColor};
    color: ${textColor};
    
    &:hover {
      ${!disabled && `
        box-shadow: ${applyShadow(4)};
        background: ${getOverlay(backgroundColor, theme.overlay, 0.08)};
      `};
    }
    
    // TODO: remove this IIFE and find a better, more generic way to do this
    &:focus, &:active {
    ${(() => {
      const focusBg = getOverlay(backgroundColor, theme.overlay, 0.24, true);
      const hoverFocusBg = getOverlay(focusBg, theme.overlay, 0.08);
      return `
      background: ${focusBg};
        &:hover {
          background: ${hoverFocusBg}!important;
      }`;
  })()}
    }
    
    ${disabled && `
        box-shadow: none;
        background: ${theme.disabled};
        color: ${getOverlay(textColor, '#FFFFFF', 0.38)};
        
        //         background: ${getOverlay(theme.surface, '#FFFFFF', 0.12)};
        // color: ${theme.disabled};
        cursor: default;
    `};
    
    ${isActive && `
        box-shadow: ${applyShadow(6)}!important;
     `};
    
    
    &:after {
      background: rgba(255,255,255,0.24);
    }
    
    & svg {
      fill: ${textColor};
    }
`;
}}`;

export const TextButton = styled(BaseButton)`${props => {
  const { color = 'primary', theme, disabled } = props;
  const { r, g, b } = hexToRgb(theme[color]);
  const { r: rO, g: gO, b: bO } = hexToRgb(
    !theme.isDark ? '#000000' : '#FFFFFF');
  // material guidelines suggest 0.12, however 0.22 looks clearer on dark theme
  // maybe reconsider to put it on light theme also (0.22)
  const activatedAlpha = theme.isDark ? '0.22' : '0.12';
  const activatedColor = `rgba(${r},${g},${b}, ${activatedAlpha})`;
  const hoverColor = `rgba(${rO}, ${gO}, ${bO}, 0.04)`;
  const rippleColor = `rgba(${r}, ${g}, ${b}, 0.12)`;
  const textColor = theme[color];
  return `
    color: ${textColor};
    
    &:hover:not(:disabled) {
      background: ${hoverColor}
    }
    
    &:active, &:focus {
      background: ${activatedColor}!important;      
    }
    
    &:after {
      background: ${rippleColor};
    }
    
    ${disabled && `
      color: ${theme.disabled};
      cursor: default;
    `}
    
    
    & svg {
      fill: ${textColor};
    }
  `;
}}
`;
