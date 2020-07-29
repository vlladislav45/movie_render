import styled from 'styled-components';
import {
  transitionDurations,
  transitionFunctions,
} from 'config/animationConstants';
import { getOverlay } from 'utils/colorUtils';
import { ReactComponent as ArrowSvg } from 'assets/icons/right-arrow-24px.svg';

const { smallArea, mediumExpand, mediumCollapsing, largeExpand } = transitionDurations;
const { standardEasing, acceleratedEasing, deceleratedEasing } = transitionFunctions;
export const GenresContainer = styled.div`
    // To be centered in the grid
    ${props => !props.isOverflow && 'justify-self: center;'};
    margin-top: 30px;
    overflow: hidden;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    
    // If is overflow === null then calculations have not yet been made
    transition: opacity 150ms linear;
    opacity: 1;
    ${props => props.isOverflow === null && 'opacity: 0'};
`;

export const Carousel = styled.div`
    margin: 0 10px;
    overflow: hidden;
`;

export const GenresList = styled.ul`
    position: relative;
    display: flex;
    transition: transform ${smallArea}ms ${standardEasing};
    
    ${props => props.offset && `
        transform: translateX(${props.offset}px);
    `}
`;

export const SingleGenre = styled.li`
    user-select: none;
    cursor: ${props => props.isDisabled ? 'default' : 'pointer'};
    
    position: relative;
    margin: 0 5px;
    font-size: 1.1rem;
    width: 100%;
    
    ${({ isDisabled, theme }) => isDisabled 
      ? `color: ${theme.isDark ? theme.disabled : getOverlay(theme.onPrimary, theme.primary ,0.38, true)}`
      : `color: ${theme.isDark ? theme.primary : theme.onPrimary}`
    };
    
    ${props => props.isActive && `
        transition: color ${smallArea}ms;
        color: ${props.theme.onSecondary};
        ${props.isDisabled && `
          &:after {
            content: ''; 
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: ${props.theme.overlay};
            opacity: 0.28;
            border-radius: 20px;
           }
        `};
     `};
     
     
     
    // Hover effect
    & :before {
      content: ''; 
      position: absolute;
      width: 100%;
      height: 100%;
      background: ${props => props.theme.contrast};
      opacity: 0;
      left: 0;
      top: 0;
    }

    & :hover:before {
      opacity: ${props => !props.isDisabled && (props.isActive ? 0.08 : 0.04)};
    }
     
    // Inner p for animation
    & > p {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      padding: 10px;
      border-radius: 20px;
    }
    & > p:after {
      z-index: -1; // appear below the item
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      width: 5px;
      height: 100%;
      opacity: 0;
      background-color: ${props => props.theme.secondary};
      pointer-events: none;
      
      transition: transform ${smallArea}ms ${standardEasing}, opacity ${smallArea}ms ${standardEasing};
      ${props => props.isActive && `
        transition: transform ${mediumExpand}ms ${acceleratedEasing}, opacity ${smallArea}ms ${acceleratedEasing};
        transform: scaleX(50);
        opacity: 1;
      `};
    }
`;

export const Arrow = styled(ArrowSvg)`
  ${({ disabled, flipped, theme }) => {
  const fillColor = theme.secondary;
  return `
      width: 2rem;
      height: 2rem;
      min-width: 24px;
      min-height: 24px;
      fill: ${fillColor};
      
      transition: all .2s;
      
      ${!disabled && 'cursor: pointer'};
      ${flipped && 'transform: rotate(180deg)'};
      
      &:hover {
        ${!disabled && `
          fill: ${fillColor}DD;
        `}
      }
      
      ${disabled && `
        fill: ${theme.disabled};
      `}
    `;
}};
`;
