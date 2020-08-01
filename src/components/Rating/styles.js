import styled from 'styled-components';

export const StyledRating = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

`;

export const StarContainer = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  display: inline-block;
  
  ${({ rateable, color, theme }) => `
    & > svg {
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
