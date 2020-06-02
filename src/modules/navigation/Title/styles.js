import styled from 'styled-components';

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 50%;
`;

export const StyledTitle = styled.h1`
    color: ${props => props.theme.textColor};
    font-size: 2.1rem;
    font-family: 'Roboto', sans-serif;
    letter-spacing: -1.5px;
    font-weight: 300;
`;

export const StyledSubTitle = styled.h2`
    color: ${props => props.theme.textColor};
    font-size: 1.5rem;
    font-family: 'Roboto', sans-serif;
    letter-spacing: -0.5px;
    font-weight: 300;
`;