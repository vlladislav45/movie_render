import React from 'react';
import { StyledPageItem } from './styles';

const PageItem = ({ isActive, onClick , page, className }) => {
  const handleClick = React.useCallback(() => onClick(page), []);
  return (
    <StyledPageItem
      className={className}
      isActive={isActive}
      onClick={handleClick}
    >
      {(typeof page === 'number') ? page + 1 : page}
    </StyledPageItem>
  );
};

export default PageItem;