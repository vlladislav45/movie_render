import styled from 'styled-components';

export const PageItem = styled.div`${props => {
  const { theme, isDisabled, isActive } = props;
  const { textColor, primary, accent, surface, disabled } = theme;
  return `
    color: ${textColor};
    border: 1px solid ${disabled};
    cursor: pointer;
    padding: 10px;
    font-size: 0.7rem;
    
    user-select: none;
    text-align: center;
    
    &.page-number {
      font-family: 'Lobster', cursive;
    }
    
    &:hover {
      ${!isActive && !isDisabled && `
        box-shadow: inset 0 0 0 500px ${primary}44;
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
      background: ${primary}88;
    `};
  `;
}}`;

export const StyledPagination = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20px, 40px));
  grid-template-rows: auto;
  grid-gap: 10px;
  grid-auto-flow: column;
  
  & > :first-child, & > :last-child {
    grid-column: span 2;
  }
  
`;
