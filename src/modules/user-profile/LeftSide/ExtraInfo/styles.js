import styled from 'styled-components';
import { ReactComponent as EditIcon } from 'assets/icons/edit.svg';


// 2 columns grid with left side being extra info name (ex: Name, Age, Sex)
// and right side being extra info value (ex: Stefan, 28, Male)
export const ExtraInfoContainer = styled.div`
  display: grid;
  grid-template-columns: min-content min-content;
  grid-template-rows: repeat(4, min-content);
  grid-row-gap: 15px;
  grid-column-gap: 15px;
  align-items: baseline;
  //Position itself in parent's grid
  grid-area: 3 / 1 / 3 / -1;
`;

// Left part of the grid
export const ExtraInfoKey = styled.div`
  grid-column: 1 / 1;
  white-space: nowrap;
  font-size: 1rem;
  font-family: 'Lato', sans-serif;
  color: ${props => props.theme.onSurfaceMD}; 
`;

// Right part of the grid
export const ExtraInfoValue = styled.div`
  grid-columns: 2 / 2;
  white-space: nowrap;
  font-size: 1rem;
  font-family: 'Lato', sans-serif;
  color: ${props => props.theme.onSurface};
  
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: all 100ms;
  &:hover {
    text-decoration-color: ${props => props.theme.onSurface};
  }
  &:hover svg {
    opacity: 1;
  }
`;

export const EditBtn = styled(EditIcon)`
  width: 24px;
  height: 24px;
  opacity: 0;
  transition: opacity 100ms;
  fill: ${props => props.theme.onSurface}
`;
