import styled from 'styled-components';

export const StyledRating = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

`;

export const StarContainer = styled.div`
  width: ${props => props.starSize};
  height: ${props => props.starSize};
  display: inline-block;
  
  ${({ rateable, color, theme, starSize }) => `
    & > svg {
      width: ${starSize}!important;
      height: ${starSize}!important;
      fill: ${theme[color]};
    }
    ${rateable && `
      &:hover > svg {
        cursor: pointer;
        & .inner {
         stroke: ${theme[color]};
         stroke: 2px;
        }
      }
    `};
  `}
`;
