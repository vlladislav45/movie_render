import { rippleConstants } from 'config/animationConstants';
import styled from 'styled-components';
import { applyShadow, getOverlay } from 'utils/colorUtils';
import { ACTIVE_RIPPLE_CLASS, RIPPLE_DURATION, WithRipple } from 'components/Styled/BaseRipple';

export const LeadingIcon = styled.span`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  
  & > svg {
    width: 24px;
    height: 24px;
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

export const BaseButton = styled(WithRipple)`${props => {
  const { withIcon } = props;
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
    user-select: none;
    
    position: relative;
    overflow: hidden;
    cursor: pointer;
    
   // HOVER override :before background color property and opacity on hover to use
   &:before {
    transition: all .2s ease;
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    opacity: 0;
   }
   
   &:focus, &:active, &:focus-inner {
    outline: none;
    border: none;
   }
  `;
}}
`;
BaseButton.dispalyName = 'BaseButton';

export const ContainedButton = styled(BaseButton)`${props => {
  const { theme, color, disabled } = props;
  const textColor = theme[`on${color.charAt(0).toUpperCase() +
  color.slice(1)}`];
  const backgroundColor = theme[color];
  
  return `
    box-shadow: ${applyShadow(2)};
    background: ${backgroundColor};
    color: ${textColor};
    
    &:hover:not(:disabled):before {
      opacity: 0.08;
      background: ${theme.overlay};
    }
    
    &:hover:not(:disabled) {
      box-shadow: ${applyShadow(4)};
    }
    
    &:focus, &:active {
      background: ${getOverlay(backgroundColor, theme.overlay, 0.24)};
    }
    
    &:after {
      background: ${theme.overlay};
    }
    
    ${disabled && `
        box-shadow: none;
        background: ${theme.disabled};
        color: ${getOverlay(textColor, '#FFFFFF', 0.38)};
        cursor: default;
    `};
    
    &.${ACTIVE_RIPPLE_CLASS} {
        box-shadow: ${applyShadow(6)};
    };
    
    & svg {
      fill: ${textColor};
    }
`;
}}`;
ContainedButton.displayName = 'ContainedButton';

export const TextButton = styled(BaseButton)`${props => {
  const { color: themeColor = 'primary', theme, disabled } = props;
  const textColor = theme[themeColor];
  
  return `
    & svg {
      fill: ${textColor};
    };
    
    color: ${textColor};
    position: relative;
    
    &:hover:not(:disabled):before {
      background: ${textColor};
      opacity: 0.04;
    }
    
    &:after {
      background: ${textColor};
    }
    
    &:focus, &:active {
      background: ${textColor}25;
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
TextButton.dispalyName = 'TextButton';
