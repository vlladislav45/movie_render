import styled from 'styled-components';
import { ReactComponent as ArrowSvg } from 'assets/icons/right-arrow-24px.svg';

export const SLIDE_DURATION = 300;

export const GenresContainer = styled.div`
    // To be centered in the grid
    ${props => !props.isOverflow && 'justify-self: center;'};
    overflow: hidden;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
`;

export const Carousel = styled.div`
    margin: 0 10px;
    overflow: hidden;
`;

export const GenresList = styled.ul`
    display: flex;
    transition: transform ${SLIDE_DURATION}ms ease;
    
    ${props => props.offset && `
        transform: translateX(${props.offset}px);
    `}
`;

export const SingleGenre = styled.li`
    user-select: none;
    cursor: pointer;
    margin: 0 10px;
    line-height: 75px;
    font-size: 1rem;
    
    &:hover {
      opacity: .7;
    }
`;

export const Arrow = styled(ArrowSvg)`
  ${({ disabled, flipped, theme }) => {
    const fillColor = theme.isDark ? theme.primary : theme.secondary;
  return `
      width: 2rem;
      height: 2rem;
      min-width: 24px;
      min-height: 24px;
      fill: ${fillColor};
      
      & .outline {
        stroke: ${theme.onSurface};
      }
      
      transition: filter .2s, fill 0.3s;
      
      ${!disabled && 'cursor: pointer'};
      ${flipped && 'transform: rotate(180deg)'};
      
      &:hover {
        ${!disabled && `
          fill: ${fillColor}DD;
          filter: drop-shadow(1px 1px 0px ${theme.onSurface});
          ${flipped && `
            filter: drop-shadow(1px -1px 0px ${theme.onSurface});
          `};
        `}
      }
      
      ${disabled && `
        fill: none;
        stroke: ${theme.disabled}; 
      `}
    `;
}};
`
