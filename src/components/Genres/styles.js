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
    font-size: 1.1rem;
    
    // color: ${props => props.theme.onPrimary};
    // color: ${props => props.isActive && 'red'};
    
    &:hover {
      opacity: .7;
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
      
      & .outline {
        // stroke: ${theme.onSurface};
      }
      
      transition: all .3s;
      
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
`
