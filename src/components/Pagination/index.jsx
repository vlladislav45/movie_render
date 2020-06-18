import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { PageItem, StyledPagination } from './styles';

const DEFAULT_ITEMS_PER_PAGE = 2;
const Pagination = ({ itemsCount, currentPage = 0, itemsPerPage = DEFAULT_ITEMS_PER_PAGE, onPageChange, ...rest }) => {
  const [totalPages, setTotalPages] = useState(0);
  const [currentSelected, changeSelectedPage] = useState(currentPage);


  useEffect(() => {
    setTotalPages(Math.ceil(itemsCount / itemsPerPage));
  }, [itemsCount, itemsPerPage]);

  function selectPage(page) {
    if (page < 0 || page >= totalPages)
      return;

    changeSelectedPage(page);
    console.log(onPageChange)
    if (onPageChange)
      onPageChange(page);
  }

  return (
    <StyledPagination id='pagination'>
      {totalPages > 0 &&
        <PageItem
          isDisabled={currentSelected === 0}
          onClick={() => selectPage(currentSelected - 1)}
        >
          {'Previous'}
        </PageItem>
      }
      {[...Array(totalPages)].map((und, index) => {
        return (
          <PageItem
            key={index}
            isActive={currentSelected === index}
            onClick={() => selectPage(index)}
          >
            {index + 1}
          </PageItem>
        );
      })}
      {totalPages > 0 &&
      <PageItem
        onClick={() => selectPage(currentSelected + 1)}
        isDisabled={currentSelected === totalPages-1}
      >
        {'Next'}
      </PageItem>
      }
    </StyledPagination>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number,
  itemsPerPage: PropTypes.number,
  onPageChange: PropTypes.func,
};

export default Pagination;