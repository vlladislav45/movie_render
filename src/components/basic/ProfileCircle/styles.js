import styled from 'styled-components';

export const StyledContainer = styled.div`
    user-select: none;
    border-radius:50%;
`;

export const StyledProfileCircle = styled.img`
    user-select: none;
    border-radius: 50%;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    cursor: pointer;
`;

