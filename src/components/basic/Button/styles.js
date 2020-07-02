import styled from 'styled-components';
import { applyShadow, getOverlay, hexToRgb } from 'utils/colorUtils';
import { rippleConstants } from 'config/constants';


const { RIPPLE_DURATION } = rippleConstants;

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
       animation: doRipple ${RIPPLE_DURATION + 20}ms linear forwards;
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
        background: ${theme.disabled};
        // color: ${theme.onDisabled};
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
  const { r: rO, g: gO, b:bO} = hexToRgb(!theme.isDark ? '#000000' : '#FFFFFF');
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
  `
}}
`;
