import styled from 'styled-components';
import { MAX_Z_INDEX } from 'config/zIndexes';
import { applyShadow } from 'utils/colorUtils';
import { transitionDurations, transitionFunctions, } from 'config/animationConstants';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';

const { acceleratedEasing, deceleratedEasing, standardEasing } = transitionFunctions;
const { mediumExpand, mediumCollapsing } = transitionDurations;

export const ModalWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #00000088;
  z-index: ${MAX_Z_INDEX};
  overflow: hidden;
  
  display: flex;
  visibility:  ${props => props.isOpen ? 'visible' : 'hidden'};
  ${props => !props.isOpen && `transition: visibility ${mediumCollapsing}ms ${standardEasing};`};

  
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
    padding: 24px;
    animation-duration: ${mediumCollapsing}ms;
    animation-timing-function: ${acceleratedEasing};
    animation-fill-mode: forwards;
    max-width: 80%;
    
    ${isOpen && `
      animation-duration: ${mediumExpand}ms;
      animation-timing-function: ${deceleratedEasing};
    `}
    
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
      transition: opacity ${mediumExpand}ms ${standardEasing};
    `};
    
    ${isOpen && `opacity: 1`};
    
    @keyframes slideToBottom {
      0% {
        transform: translateY(-300%);
      }
      100% {
        transform: translateY(0);
      }
    }
    
    @keyframes slideToTop {
      0% {
        transform: translateY(300%);
      }
      100% {
        transform: translateY(0);
      }
    }
    
    @keyframes slideToRight {
      0% {
        transform: translateX(-300%);
      }
      100% {
        transform: translateX(0);
      }
    }
    
    @keyframes slideToLeft {
      0% {
        transform: translateX(300%);
      }
      100% {
        transform: translateX(0);
      }
    }
  `;
}}  
`;

export const CloseButton = styled(CloseIcon)`
  position: absolute;
  right: 16px;
  top: 16px;
  cursor: pointer;
  z-index: 10;
  fill: ${p => p.theme.onPrimary};
  &:hover {
    fill: ${p => p.theme.onPrimary}66;
  }
`;