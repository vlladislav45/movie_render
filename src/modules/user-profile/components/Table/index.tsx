import React, { useCallback } from 'react';
import { GridContainer, GridItem, Heading } from './styles';

interface GridProps {
  items: string[][],
  columnNames: string[],
}

const Table = (props: GridProps) => {
  const { items, columnNames } = props;

  const renderHeading = useCallback(() => columnNames.map((columnName, columnIndex) =>
    <GridItem
      className='heading-item'
      key={columnName}
      $row={1}
      $col={columnIndex + 1}
    >
      {columnName}
    </GridItem>
  ), [columnNames]);

  const renderItems = useCallback(() => items.map(
    (row, rowNumber) => row.map(
      (item, colNumber) => <GridItem
        key={`${rowNumber}_${colNumber}`}
        $row={rowNumber + 2}
        $col={colNumber + 1}
      >
        {item}
      </GridItem>
    )
  ), [items]);

  return (
    <GridContainer
      $rows={items.length + 1} // Column names
      $columns={columnNames.length}
    >
      <Heading>
      {renderHeading()}
      </Heading>
      {renderItems()}
    </GridContainer>
  );
};

export default Table;