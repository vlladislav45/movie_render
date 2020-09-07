import styled from 'styled-components';


interface ContainerProps {
  $rows :number,
  $columns :number,
}

interface ItemProps {
  $row :number,
  $col :number,
}
export const GridContainer = styled.div<Pick<ContainerProps, any>>`
  display: grid;
  box-sizing: content-box;

  --cols: ${p => p.$columns};
  --rows: ${p => p.$rows};
  --width: 100%;
  --height: 100%;
  grid-template-columns: repeat(var(--cols), 1fr);
  grid-template-rows: repeat(var(--rows), 1fr);
  
  width: var(--width);
  height: var(--height);
  min-width: 600px;
  border-left: 1px solid ${p => p.theme.onSurfaceMD};
  color: ${p => p.theme.onSurface};
  font-size: 0.8rem;
  font-family: 'Roboto', sans-serif;
  
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* Disable scrollbar Chrome/Safari/Webkit */
  }
`;

export const GridItem = styled.div<Pick<ItemProps, any>>`
  grid-row-start: ${p => p.$row};
  grid-column-start: ${p => p.$col};
  border-bottom: 1px solid ${p => p.theme.onSurfaceMD};
  border-right: 1px solid ${p => p.theme.onSurfaceMD};
  padding: 10px;
  
  white-space:nowrap;
  overflow: hidden;
  font-size: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  &.heading-item {
    font-weight: bold;
  }
`;

export const Heading = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(var(--cols), 1fr);
  width: var(--width);
  height: 57px;
  grid-area: 1 / 1 / 1 / -1;
  border-top: 1px solid ${p => p.theme.onSurfaceMD};
  background: ${p => p.theme.surface};
  z-index: 1;
`;