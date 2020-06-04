import styled from 'styled-components';
import { ThemedComponent } from 'components/basic';

export const StyledContainer = styled(ThemedComponent)`
    border-radius:50%;
    transition: box-shadow .3s;
`;
export const StyledProfileCircle = styled.div`
    border-radius: 50%;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    background-blend-mode: multiply;
    background-image: url("${props => props.url}");
    background-position: top center;
    background-repeat: no-repeat;
    background-origin: content-box;
    background-size: contain;
    cursor: pointer;
`;

export const HoverDiv = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 600px;
  opacity: 0;
  pointer-events: none;
  // z-index: -10;
  // background: rgba( 255, 0 ,0 , .5);
  display: ${props => props.isVisible ? 'block' : 'none'};
`;
