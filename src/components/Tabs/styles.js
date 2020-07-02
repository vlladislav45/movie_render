import styled from 'styled-components';
import { NORMAL_Z_INDEX } from 'config/zIndexes';
import { applyShadow, getOverlay } from 'utils/colorUtils';
import { rippleConstants } from 'config/constants';

const { RIPPLE_DURATION } = rippleConstants;

export const TabsContainer = styled.div`${props => {
  const { prominent, color, theme, activeTab } = props;

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
    box-shadow: ${applyShadow(8)};
    
    ${prominent && `
      background: ${theme[color]};
    `};
    
    &::before {
      z-index: ${NORMAL_Z_INDEX};
      transition: left .2s ease;
      content: '';
      width: ${width || 100}px;
      height: 2px;
      background: ${prominent ? theme.overlay : theme[color]};
      left: ${left}px;
      bottom: 0;
      position: absolute;
    }
  `;
}}
`;

export const SingleTab = styled.div`${props => {
  const { isActive, rippleActive, prominent, color, theme, rippleStart } = props;
  const { x, y } = rippleStart;
  const themedColor = theme[color];
  const onColor = theme[`on${color.charAt(0).toUpperCase() + color.slice(1)}`];

  const hoverColor = prominent
    ? getOverlay(themedColor, theme.overlay, 0.04, true)
    : getOverlay(theme.overlay, themedColor, 0.04, true);

  const focusColor = prominent
    ? getOverlay(themedColor, theme.overlay, 0.12, true)
    : getOverlay(theme.overlay, themedColor, 0.12, true);

  return `
    position: relative;
    overflow: hidden;
    height: 100%;
    text-transform: uppercase;
    font-size: 0.875rem;
    font-family: 'Roboto', sans-serif;
    letter-spacing: 1.25px;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    padding: 15px;


    &:hover {
      background: ${hoverColor};
    }

    &:focus {
      outline: none;
      background: ${focusColor};
    }

    ${prominent && `
      color: ${onColor}DD;
    `};

     ${isActive && `
      color: ${prominent ? onColor : themedColor};
      &:hover {
        background: ${prominent && getOverlay(hoverColor, theme.overlay, 0.04)};
      }
      &:focus {
        background: ${prominent && getOverlay(focusColor, theme.overlay, 0.12)};
      }
      &:after {
        ${rippleActive && prominent && 'opacity: 0.16!important'};
      }
    `};

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
     background: ${prominent ? theme.overlay : themedColor};
     ${rippleActive && `
       animation: doRipple ${RIPPLE_DURATION + 50}ms ease forwards;
       opacity: 0.12;
     `};

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

export const TabText = styled.p``;
