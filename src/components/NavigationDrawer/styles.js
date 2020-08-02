import styled from 'styled-components';
import { transitionFunctions, transitionDurations } from 'config/animationConstants';
import { MAX_Z_INDEX } from 'config/zIndexes';
import { MaterialSurface } from '../basic';
import DrawerHeader from './DrawerHeader';
import { L, lessThen, M } from '../../utils/mediaUtils';

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
  width: 40%;
  min-width: 360px;
  border-top-left-radius: 0!important;
  border-bottom-left-radius: 0!important;
  
  transition: transform 300ms;
  transform: translateX(-100%);
  
  ${props => props.isOpen && `
    transform: translateX(0);
  `};
  
  ${props => {
    const { responsive: { device, width } } = props;
    const FREE_SPACE_ON_MOBILE = 56;
    return `
      ${lessThen(device, M) && `
        width: ${width - FREE_SPACE_ON_MOBILE}px;
        max-width: ${width - FREE_SPACE_ON_MOBILE}px;
        min-width: ${width - FREE_SPACE_ON_MOBILE}px;
      `}
    `
    }
  }
`;


export const DrawerDivider = styled.hr`
  color: ${props => props.theme.onSurface};
  opacity: 0.3;
`;
