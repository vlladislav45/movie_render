import styled from 'styled-components';
import { XS_SM } from '../../../utils/mediaUtils';

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    user-select: none;
    cursor: pointer;
    &:hover {
      opacity: 0.87;
    } 
`;

export const StyledTitle = styled.h1`
    font-size: ${props => props.device === XS_SM ? '1.8rem' : '2rem'};
    font-family: 'Roboto', sans-serif;
    letter-spacing: -1.5px;
    font-weight: 300;
`;

export const StyledSubTitle = styled.h2`
    color: ${props => props.theme.onSurface};
    font-size: 1.2rem;
    font-family: 'Roboto', sans-serif;
    letter-spacing: -0.5px;
    font-weight: 300;
`;
