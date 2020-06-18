import styled from 'styled-components';

export const PageItem = styled.div`${props => {
  const { theme, isDisabled, isActive } = props;
  const { textColor, primary, accent, surface, disabled } = theme;
  return `
    color: ${textColor};
    border: 1px solid ${textColor};
    cursor: pointer;
    padding: 10px;
    
    user-select: none;
    text-align: center;
    
    &:hover {
      ${!isActive && !isDisabled && `
        box-shadow: inset 0 0 0 500px ${primary}22;
      `};
    }
    
    ${isDisabled && `
      color: ${disabled};
      border-color: ${disabled};
      cursor: inherit;
    `};
    
    ${isActive && `
      color: ${textColor};
      border-color: ${primary};
      background: ${primary}66;
    `};
  `;
}}`;

export const StyledPagination = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.maxItems || 10}, 1fr);
  grid-template-rows: auto;
  grid-column-gap: 2px;
`;