import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { PageItem, StyledPagination } from './styles';

const DEFAULT_ITEMS_PER_PAGE = 2;
const Pagination = ({ itemsCount, currentPage = 0, itemsPerPage = DEFAULT_ITEMS_PER_PAGE, onPageChange, ...rest }) => {
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPage, changeSelectedPage] = useState(currentPage);


  useEffect(() => {
    setTotalPages(Math.ceil(itemsCount / itemsPerPage));
  }, [itemsCount, itemsPerPage]);

  function selectedPage(page) {
    changeSelectedPage(page);
    onPageChange(page);
  }

  return (
    <StyledPagination id='pagination'>
      {[...Array(totalPages)].map((und, index) => {
        return (
          <PageItem
            key={index}
            isActive={selectedPage === index}
            onClick={() => selectedPage(index)}
          >
            {index + 1}
          </PageItem>
        );
      })}
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