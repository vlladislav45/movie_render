import styled from 'styled-components';
import { ReactComponent as ArrowSvg } from 'assets/icons/right-arrow-24px.svg';

export const GenresContainer = styled.div`
    overflow: hidden;
    width: 90%;
    margin: 50px auto 0;
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
    transform-style: preserve-3d; 
    transition: transform .5s, opacity .5s, z-index .5s;
    
    ${props => props.offset && `
        transform: translateX(${props.offset}px);
    `}
`;

export const SingleGenre = styled.li`
    user-select: none;
    cursor: pointer;
    margin: 0 10px;
    line-height: 75px;
    font-size: 1.2rem;
    color: ${props => props.theme.textColor};
    
    &:hover {
      opacity: .8;
    }
`;

export const Arrow = styled(ArrowSvg)`
  ${({ disabled, flipped, theme }) => {
    const fillColor = theme.isDark ? theme.primary : theme.accent;
  return `
      width: 48px;
      height: 48px;
      stroke: ${theme.textColor};
      fill: ${fillColor};
      
      transition: fill .3s ease;
      
      ${!disabled && 'cursor: pointer'};
      ${flipped && 'transform: rotate(180deg)'};
      ${disabled && `
        fill: ${theme.disabled};
        stroke: none; 
      `}
      
      &:hover {
        fill: ${disabled ? '' : fillColor}99;
      }
    `;
}};
`;
