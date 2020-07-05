import styled from 'styled-components';
import { applyShadow, getOverlay } from 'utils/colorUtils';
import { HIGH_Z_INDEX } from 'config/zIndexes';
import Button from '../Button';

export const SNACKBAR_FADE_IN_DURATION = 300;
export const SnackBarContainer = styled.div`
  position: fixed;
  bottom: 16px;
  left: 16px;
  min-width: 344px;
  padding: 6px 16px;
  background: #323232;
  z-index: ${HIGH_Z_INDEX};
  box-shadow: ${applyShadow(16)};
  color: #FFF;
  
  
  opacity: 0;
  transition: opacity ${SNACKBAR_FADE_IN_DURATION}ms ease;
  ${props => props.appear && `
    opacity: 1;
  `};
`;

export const SnackBarInner = styled.div`${props => {
  return `
    width: 100%;
    height: 46px;
    min-height: 48px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
  `;
}}`;

export const SnackBarMessage = styled.span`
  font-size: 0.8rem;
  font-family: 'Roboto', sans-serif;
  color: ${getOverlay('#323232', '#FFFFFF', 0.87)};
  
  margin-right: 70px;
`;

export const ActionsContainer = styled.div`
`;

export const ActionButton = styled(Button)`

  
  &:last-child {
    // Container padding is 16px, we need 8px (from guidelines)
    margin-right: -8px;
  }
  
  & > button {
    font-size: 0.75rem;
  }
`;
