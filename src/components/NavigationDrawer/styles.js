import styled from 'styled-components';
import { transitionFunctions, transitionDurations } from 'config/animationConstants';
import { MAX_Z_INDEX } from 'config/zIndexes';
import { MaterialSurface } from '../basic';

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

  
  align-items: center;
  justify-content: center;
`;

export const Drawer = styled(MaterialSurface)`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 20%;
`;