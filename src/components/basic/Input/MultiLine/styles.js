import styled from 'styled-components';
import {
  transitionDurations,
  transitionFunctions,
} from 'config/animationConstants';
import { NORMAL_Z_INDEX } from 'config/zIndexes';
import { getOverlay } from 'utils/colorUtils';
import { BaseLabel, RippleElem } from '../baseStyles';

export const MultiLineInputContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const MultiLineInput = styled.textarea`${props => {
  const { theme, isOnPrimary } = props;
  const { contrast, primary, secondary, surface, onSurface } = theme;
  const accentColor = isOnPrimary ? secondary : primary;
  
  const background = getOverlay(surface, contrast, 0.04);
  const hover = getOverlay(surface, contrast, 0.08);
  const focus = getOverlay(surface, contrast, 0.12);

  const borderColor = getOverlay(accentColor, contrast, 0.38, true);
  const hoverBorderColor = getOverlay(accentColor, contrast, 0.60, true);
  
  return `
    z-index: ${NORMAL_Z_INDEX};
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 1rem;
    resize: none;
    overflow: hidden;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    background: ${background};
    border-bottom: 1px solid;
    color: ${onSurface};
    caret-color: ${accentColor};
    padding: 20px 16px 6px;
    
    &:not(:disabled) {
      cursor: pointer;
      border-bottom-color: ${borderColor};
    }
    
    &:hover {
      background: ${hover};
      border-bottom-color: ${hoverBorderColor};
    }
    
    &:focus {
      cursor: auto;
      background: ${focus};
    }
  `
}}
`;

export const Label = styled(BaseLabel)`
  top: 25px;
`;
