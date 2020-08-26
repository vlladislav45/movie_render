import styled from 'styled-components';

export const PromptContainer = styled.div`
  ${props => `
    display: grid;
    grid-template: repeat(${props.rows}, min-content) / repeat(${props.cols}, minmax(min-content, 1fr));
    grid-gap: ${props.$isSmall ? '5px' : '15px'};
  `}  
`;

export const PromptTitle = styled.h2`
  grid-area: 1 / 1 / 1 / -1;
  font-size: ${({ $smallDevice }) => $smallDevice ? '1.1rem' : '1.3rem'};
  font-family: 'Roboto', sans-serif;
  text-align: center;
  color: ${props => props.theme.onSurface};
`;

export const PromptText = styled.p`
  grid-area: 2 / 1 / 2 / -1;
  font-size: ${({ $smallDevice }) => $smallDevice ? '0.8rem' : '1rem'};
  font-family: 'Lato', sans-serif;
  text-align: center;
  color: ${props => props.theme.onSurfaceMD};
`;

export const ActionsBar = styled.div`
  grid-row-start: -1;
  grid-column-end: -1;
  display: flex;
`;

export const FormField = styled.div`
  grid-area: 3 / 1 / -1 / -1;
  ${props => props.isCompact && `
    grid-area: 2 / 1 / -1 / -1;
  `}
`;
