import styled from 'styled-components';
import { ThemedComponent } from 'components/basic';

export const StyledContainer = styled(ThemedComponent)`
    border-radius:50%;
    transition: box-shadow .3s;
`
export const StyledProfileCircle = styled.div`
    border-radius: 50%;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    background-image: url("${props => props.url}");
    background-position: top center;
    background-repeat: no-repeat;
    background-origin: content-box;
    background-size: contain;
    cursor: pointer;
`;