import styled from 'styled-components';
import { XS_SM } from '../../../utils/mediaUtils';

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const StyledTitle = styled.h1`
    color: ${props => props.theme.textColor};
    font-size: ${props => props.device === XS_SM ? '1.8rem' : '2rem'};
    font-family: 'Roboto', sans-serif;
    letter-spacing: -1.5px;
    font-weight: 300;
`;

export const StyledSubTitle = styled.h2`
    color: ${props => props.theme.textColor};
    font-size: 1.2rem;
    font-family: 'Roboto', sans-serif;
    letter-spacing: -0.5px;
    font-weight: 300;
`;
