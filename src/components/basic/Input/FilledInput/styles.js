import styled from 'styled-components';
import { getOverlay } from 'utils/colorUtils';
import {
  transitionDurations,
} from 'config/animationConstants';
import { BaseLabel } from '../baseStyles';
import { BaseInput } from '../baseStyles.js';

export const StyledFilledInputContainer = styled.div`${props => {
  const { theme, focused, error, isOnPrimary, disabled: isDisabled } = props;
  const { error: errorColor, contrast, primary, onSurface, disabled, secondary, isDark } = theme;

  let surface = theme.surface;

  const accentColor = isOnPrimary ? secondary : primary;

  const background = getOverlay(surface, contrast, 0.04, true);
  const hoverBg = getOverlay(surface, contrast, 0.08, true);
  
  const borderColor = getOverlay(accentColor, contrast, 0.38, true);
  const hoverBorderColor = getOverlay(accentColor, contrast, 0.60, true);

  return `    
    transition: all ${transitionDurations.smallArea}ms linear;
    display: flex;
    position: relative;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    font-size: 1rem;
    border-bottom: 1px solid ${borderColor};
    background: ${background};
    
     ${isDisabled && `
      pointer-events: none;
      border-bottom: none;
    `};
    
    ${focused && `
      border-bottom-color: ${accentColor};
    `};
    
    ${error && `
      border-bottom-color: ${errorColor};
    `};
    
    &:hover {
      ${!focused && !isDisabled && `
        background: ${hoverBg};
      `};
      ${!focused && !error && !isDisabled && `
        border-bottom-color: ${hoverBorderColor};
      `};
    }
    
    & > svg.leading-icon {
      position: absolute;
      left: 16px;
      width: 24px;
      height 24px;
      align-self: center;
      pointer-events: none;
      fill: ${isDisabled ? disabled: onSurface};
    }
  `;
}}`;

export const InputLabel = styled(BaseLabel)`
  top: 50%;
  ${props => !props.elevated && `
    transform: translateY(-50%);
  `};
`;

export const StyledFilledInput = styled(BaseInput)`${props => {
  const { theme, focused, withLeadingIcon, hasError, isOnPrimary } = props;
  const { primary, error, onSurface, isDark, secondary } = theme;
  const color = isDark ? '#CCCCCC' : '#585858';
  const accentColor = isOnPrimary ? secondary : primary;
  return `
    align-self: flex-end;
    background: none;
    padding: 20px 16px 6px;
    caret-color: ${accentColor};
    color: ${onSurface};
    
    cursor: ${focused ? 'text' : 'pointer'};
    
    ${withLeadingIcon && `
      padding-left: 48px;
    `};
    
    ${hasError && `
      caret-color: ${error};
    `};
    
    &::selection {
      background: ${secondary}44;
    }
    
    &::placeholder {
      color: ${color};
    }
  `;
}}`;


