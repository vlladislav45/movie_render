import styled from 'styled-components';
import { transitionFunctions, transitionDurations } from 'config/animationConstants';
import { MAX_Z_INDEX } from 'config/zIndexes';
import { MaterialSurface } from '../basic';
import DrawerHeader from './DrawerHeader';
import { L, lessThen, M, SM } from '../../utils/mediaUtils';

export const Overlay = styled.div`
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
  ${props => !props.isOpen && `
    transition: visibility 300ms;
  `};
  
  align-items: center;
  justify-content: center;
`;

export const Drawer = styled(MaterialSurface)`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 300px;
  border-top-left-radius: 0!important;
  border-bottom-left-radius: 0!important;
  
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* Disable scrollbar Chrome/Safari/Webkit */
  }
  
  transition: transform 300ms;

  // transform: translateX(-100%);
  
  // ${props => props.isOpen && `
  //   transform: translateX(0);
  // `};
  
  ${props => {
  const { responsive: { device, width }, $translate, isOpen } = props;
  const FREE_SPACE_ON_MOBILE = 56;
  return `
    ${isOpen
    ? `
      transform: translateX(-${$translate}px);
      transition: none;
    `
    : 'transform: translateX(-100%);'}
    
    ${lessThen(device, SM) && `
      width: ${width - FREE_SPACE_ON_MOBILE}px;
      max-width: 300px;
    `}
  `
}
}
`;


export const DrawerDivider = styled.hr`
  color: ${props => props.theme.onSurface};
  opacity: 0.3;
`;
