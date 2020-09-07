import styled from 'styled-components';
import { NORMAL_Z_INDEX } from 'config/zIndexes';
import { applyShadow, getOverlay } from 'utils/colorUtils';
import { WithRipple } from '../Styled/BaseRipple';

export const TabsContainer = styled.div`${props => {
  const { prominent, color, theme, activeTab } = props;
  const onColor = theme[`on${color.charAt(0).toUpperCase() + color.slice(1)}`];
  let left = 0, width = 0;
  // We use parentNode here, because tab is wrapped in RippleContainer
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
    margin-bottom: 10px;
    
    &:focus {
      box-shadow: ${applyShadow(6)};
      outline: none;
    }
    
    ${prominent && `
      background: ${theme[color]};
    `};
    
    &::before {
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


export const StyledSingleTab = styled(WithRipple)`${props => {
  const { isActive, prominent, color, theme } = props;
  
  const themedColor = theme[color];
  const onColor = theme[`on${color.charAt(0).toUpperCase() + color.slice(1)}`];
  
  const hoverColor = prominent
    ? getOverlay(themedColor, theme.overlay, 0.08, true)
    : getOverlay(theme.surface, theme.contrast, 0.04, true);

  const focusColor = prominent
    ? getOverlay(themedColor, theme.overlay, 0.24, true)
    : getOverlay(theme.surface, themedColor,  0.12, true);

  return `
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
    `};
    
  `;
}}
`;

export const TabContentContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
