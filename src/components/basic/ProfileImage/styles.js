import styled from 'styled-components';

export const StyledProfileCircle = styled.img`
    user-select: none;
    ${props => props.isCircle && 'border-radius: 50%'};
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    
    transition: opacity 0.2s;
    ${props => props.$isLoading && `
        opacity: 0;
    `};
`;

