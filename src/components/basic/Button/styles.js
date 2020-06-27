import styled from 'styled-components';
import { applyShadow, getOverlay, hexToRgb } from 'utils/colorUtils';

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

let canEnd = true;
const BaseButton = styled.button`${props => {
  const { isActive, withIcon, coordinates = {} } = props;
  const { x, y } = coordinates;
  if (isActive) {
    canEnd = false;
    setTimeout(() => canEnd = true, 400);
  }
  return `
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
        
    &:active {
      outline: none;
    }
    
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
     ${isActive && `
       animation: doRipple .2s linear forwards;
       opacity: 1;
     `}
   }
   
   @keyframes doRipple {
     100% {
       transform: scale(80);
     }
   }

  `;
}}
`;

export const ContainedButton = styled(BaseButton)`${props => {
  const { theme, color, disabled, isActive } = props;

  // High emphasis text based on the color of button
  const textColor = getOverlay(theme[color], theme.overlay, 0.87);
  return `
    box-shadow: ${applyShadow(2)};
    background: ${theme[color]};
    color: ${textColor};
    
    &:hover {
      ${!disabled && `
        box-shadow: ${applyShadow(4)};
        background: ${getOverlay(theme[color], '#FFFFFF', 0.08)};
      `};
    }
    
    &:focus, &:active {
      background: ${getOverlay(theme[color], '#FFFFFF', 0.24)};
    }
    
    ${disabled && `
        box-shadow: none;
        background: ${getOverlay(theme[color], '#FFFFFF', 0.38)};
        color: ${getOverlay(textColor, '#FFFFFF', 0.38)};
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
  const { color, theme, disabled } = props;
  const { r, g, b } = hexToRgb(theme[color]);
  const { r: rO, g: gO, b:bO} = hexToRgb(!theme.isDark ? '#000000' : '#FFFFFF');
  // material guidelines suggest 0.12, however 0.22 looks clearer on dark theme
  // maybe reconsider to put it on light theme also (0.22)
  const activatedAlpha = theme.isDark ? '0.22' : '0.12'; 
  const activatedColor = `rgba(${r},${g},${b}, ${activatedAlpha})`;
  const hoverColor = `rgba(${rO}, ${gO}, ${bO}, 0.04)`;
  const rippleColor = `rgba(${r}, ${g}, ${b}, 0.12)`;
  const textColor = theme.onSurface;
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
  `
}}
`;
