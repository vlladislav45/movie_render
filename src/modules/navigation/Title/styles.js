import styled from 'styled-components';
import { greaterThen, L } from 'utils/mediaUtils';

export const StyledTitle = styled.h1`
    font-size: 1.2rem;
    width: fit-content;
    ${props => greaterThen(props.device, L) && `
      margin: auto;
      font-size: 1.8rem;
      margin-top: -5px;
    `};
    font-family: 'Roboto', sans-serif;
    letter-spacing: -1.5px;
    font-weight: 300;
    white-space: nowrap;
    color: ${props => props.theme.onSurface};
    
    user-select: none;
    cursor: pointer;
`;