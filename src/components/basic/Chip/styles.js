import styled from 'styled-components';

const BaseChip = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 32px;
  border-radius: 20px;
  padding: 0 12px;
  color: ${props => props.theme.onSurface};
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  
  ${props => props.leadingIcon && `
    padding-left: 4px;
  `};
  
  ${props => props.closeable && `
    padding-right: 8px;
  `};
`;

export const ChipContainer = styled.div`
  // TEMPORARY
  margin: 10px;
`;

export const OutlinedChip = styled(BaseChip)`
  ${props => `
    border: 1px solid ${props.theme.disabled};
  `};
`;

export const FilledChip = styled(BaseChip)`
  ${props => `
    background: ${props.theme.disabled};
  `};
`;
