import styled from 'styled-components';
import { MaterialSurface } from '../basic';

export const CardWrapper = styled(MaterialSurface)`
  // max-width: 100%;
  // max-height: 100%;
  border-radius: 6px;
  padding: 20px;
  
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* Disable scrollbar Chrome/Safari/Webkit */
  }
`;