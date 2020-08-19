import styled from 'styled-components';
import { transitionFunctions, transitionDurations } from 'config/animationConstants';
import { MAX_Z_INDEX } from 'config/zIndexes';
import { MaterialSurface } from '../basic';
import DrawerHeader from './DrawerHeader';
import { L, lessThen, M, SM } from 'utils/mediaUtils';

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
    transition: visibility 200ms;
  `};
  
  align-items: center;
  justify-content: center;
`;
Overlay.displayName = 'DrawerOverlay'


const FREE_SPACE_ON_MOBILE = 56;
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
  
  
  ${props => {
    const { responsive: { device, width }, $isDragging, isOpen } = props;
    
    return `
      transition: transform ${transitionDurations.largeCollapsing}ms ${transitionFunctions.deceleratedEasing};
      transform: translateX(-100%);
      ${isOpen && `
        transition: transform ${transitionDurations.largeExpand}ms ${transitionFunctions.acceleratedEasing};
        transform: translateX(0);
      `};
      
      ${$isDragging && `
        transition: none;
      `};
      
      ${lessThen(device, SM) && `
        width: ${width - FREE_SPACE_ON_MOBILE}px;
        max-width: 300px;
      `}
    `
    }
  }
`;
Drawer.displayName = 'DrawerContent'

export const DrawerDivider = styled.div`
  background: ${props => props.theme.onSurface};
  opacity: 0.1;
  height: 1px;
  width: 100%;
`;
