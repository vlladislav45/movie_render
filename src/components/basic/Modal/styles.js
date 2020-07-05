import styled from 'styled-components';
import { MAX_Z_INDEX } from 'config/zIndexes';
import { applyShadow } from '../../../utils/colorUtils';

export const ModalWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.isDark ? '#000000' : '#000000'}88;
  z-index: ${MAX_Z_INDEX};
  overflow: auto;
  
  display: flex;
  will-change: visibility;
  visibility:  ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: visibility .32s;
  
  align-items: center;
  justify-content: center;
  
`;

export const ModalInner = styled.div`${props => {

  const { direction, isOpen, theme, fade } = props;
  const { surface, onSurface } = theme;
  return `
    position: absolute;
    background: ${surface};
    color: ${onSurface};
    box-shadow: ${applyShadow(12)};
    border-radius: 6px;
    padding: 16px 24px;
    animation-duration: .3s;
    animation-timing-function: ease;
    animation-fill-mode: forwards; 
    
    ${direction === 'toRight' && `
      ${isOpen && 'animation-name: slideToRight'};
      ${!isOpen && `
        animation-name: slideToLeft;    
        animation-direction: reverse;
      `};
    `};
    
    ${direction === 'toLeft' && `
      ${isOpen && 'animation-name: slideToLeft'};
      ${!isOpen && `
        animation-name: slideToRight;
        animation-direction: reverse;
      `};
    `};
    
    ${direction === 'toBottom' && `
      ${isOpen && 'animation-name: slideToBottom'};
      ${!isOpen && `
        animation-name: slideToTop;
        animation-direction: reverse;
      `};
    `};
    
    ${direction === 'toTop' && `
      ${isOpen && 'animation-name: slideToTop'};
      ${!isOpen && `
        animation-name: slideToBottom;
        animation-direction: reverse;
      `};
    `};
    
    ${fade && `
      opacity: 0;
      transition: opacity .4s;
    `};
    
    ${isOpen && `opacity: 1`};
    
    @keyframes slideToBottom {
      0% {
        transform: translateY(-200%);
      }
      100% {
        transform: translateY(0);
      }
    }
    
    @keyframes slideToTop {
      0% {
        transform: translateY(200%);
      }
      100% {
        transform: translateY(0);
      }
    }
    
    @keyframes slideToRight {
      0% {
        transform: translateX(-200%);
      }
      100% {
        transform: translateX(0);
      }
    }
    
    @keyframes slideToLeft {
      0% {
        transform: translateX(200%);
      }
      100% {
        transform: translateX(0);
      }
    }
  `;
}}  
`;
