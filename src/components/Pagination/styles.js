import styled from 'styled-components';

export const PageItem = styled.div`${props => {
  const { theme, isDisabled, isActive } = props;
  const { textColor, primary, accent, surface, disabled } = theme;
  return `
    color: ${textColor};
    border: 1px solid ${textColor};
    cursor: pointer;
    padding: 10px;
    
    &:hover {
      ${!isActive && 'background: ${surface}66;'};
    }
    
    ${isDisabled && `
      color: ${disabled};
      border-color: ${disabled};
    `};
    
    ${isActive && `
      color: ${primary};
      border-color: ${primary};
      background: ${primary}66;
    `};
  `;
}}`;

export const StyledPagination = styled.div`
  display: flex;
`;