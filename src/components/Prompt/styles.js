import styled from 'styled-components';

export const PromptContainer = styled.div`
  ${props => `
    display: grid;
    grid-template: repeat(${props.rows}, min-content) / repeat(${props.cols}, 1fr);
    grid-gap: 15px;
  `}  
`;

export const PromptTitle = styled.h2`
  grid-area: 1 / 1 / 1 / -1;
  font-size: 1.3rem;
  font-family: 'Roboto', sans-serif;
  text-align: center;
  color: ${props => props.theme.onSurface};
`;

export const PromptText = styled.p`
  grid-area: 2 / 1 / 2 / -1;
  font-size: 1rem;
  font-family: 'Lato', sans-serif;
  text-align: center;
  color: ${props => props.theme.onSurfaceMD};
`;

export const ActionsBar = styled.div`
  grid-area: -1 / -3 / -1 / -1;
  display: flex;
  & > * {
    margin-left: 5px;
  }
`;

export const FormField = styled.div`
  grid-area: 3 / 1 / -1 / -1;
  ${props => props.isCompact && `
    grid-area: 2 / 1 / -1 / -1;
  `}
  // Check if its an issue
  // margin-bottom: 16px; //Because helper text is not included in the Input height
  //TODO: fix it
`;
