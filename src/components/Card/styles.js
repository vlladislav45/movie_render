import styled from 'styled-components';
import { applyShadow } from '../../utils/colorUtils';

export const CardWrapper = styled.div`
  max-width: 100%;
  max-height: 100%;
  box-shadow: ${applyShadow(6)};
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