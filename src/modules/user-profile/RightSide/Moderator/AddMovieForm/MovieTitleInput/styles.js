import styled from 'styled-components';
import { HIGH_Z_INDEX } from 'config/zIndexes';
import { applyShadow } from 'utils/colorUtils';

export const InputWrapper = styled.div`
  position: relative;
`;

export const Suggestions = styled.ul`
  position: absolute;
  width: 100%;
  height: 200px;
  left: 0;
  top: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background: ${props => props.theme.surface};
  z-index: ${HIGH_Z_INDEX};
  visibility: ${props => props.isShown ? 'visible' : 'hidden'};
  box-shadow: ${applyShadow(10)}
`;

export const SuggestionItem = styled.div`
  color: ${props => props.theme.onSurface};
  font-size: 1rem;
  padding: 10px;
  cursor: pointer;
`;
