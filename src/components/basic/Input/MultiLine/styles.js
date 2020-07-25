import styled from 'styled-components';
import { getOverlay } from 'utils/colorUtils';
import { BaseLabel, RippleElem } from '../baseStyles';

export const MultiLineInputContainer = styled.div`${props => {
  const { theme, isOnPrimary, focused } = props;
  const { contrast, primary, secondary, surface } = theme;
  const accentColor = isOnPrimary ? secondary : primary;

  const background = getOverlay(surface, contrast, 0.04);
  const hover = getOverlay(surface, contrast, 0.08);
  const focus = getOverlay(surface, contrast, 0.12);

  const borderColor = getOverlay(accentColor, contrast, 0.38, true);
  const hoverBorderColor = getOverlay(accentColor, contrast, 0.60, true);
  return `
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 150px;
  overflow: hidden;
  
  border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    background: ${background};
    border-bottom: 1px solid;
    
    &:not(:disabled) {
      cursor: pointer;
      border-bottom-color: ${borderColor};
    }
    
    &:hover {
      background: ${hover};
      border-bottom-color: ${hoverBorderColor};
    }
    
    ${focused && `
      cursor: auto;
      background: ${focus};
      border-bottom-color: ${accentColor}!important;
    `};
  `;
}}
`;

export const MultiLineInput = styled.textarea`${props => {
  const { theme, isOnPrimary } = props;
  const { primary, secondary, onSurface } = theme;
  const accentColor = isOnPrimary ? secondary : primary;

  return `
    // Make the scrollbar invisible
    box-sizing: content-box;
    background: transparent;
    position: absolute;
    left: 0;
    top: 25px;
    width: 100%;
    // 20px for label height and 20px for 'padding'
    height: calc(100% - 40px);
    border: none;
    outline: none;
    font-size: 1rem;
    resize: none;
    padding: 0 10px;   
    color: ${onSurface};
    caret-color: ${accentColor};
    
    &:not(:focus) {
      cursor: pointer;
    }
  `;
}}
`;

export const Label = styled(BaseLabel)`
  top: 15px;
  
  ${props => props.elevated && `
      transform: translateY(-50%) scale(0.75);
  `};
`;

export const MultiLineRipple = styled(RippleElem)`
  box-sizing: border-box;
`;
