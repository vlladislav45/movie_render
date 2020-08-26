import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useDeviceDimensions from 'hooks/useDeviceDimensions';
import { L, M, SM, XL, XS_SM } from 'utils/mediaUtils';
import { PageItem, StyledPagination } from './styles';

// Fallback
const DEFAULT_ITEMS_PER_PAGE = 3;

// ONLY ODD NUMBERS
function getMaxPages(device) {
  switch (device) {
    case XS_SM:
      return 3;
    case SM:
      return 5;
    case M:
      return 7;
    case L:
      return 11;
    case XL:
      return 15;
    default: // FullHD and above
      return 25;
  }
}

const Pagination = ({ itemsCount, onPageChange, currentPage = 0,
                      itemsPerPage = DEFAULT_ITEMS_PER_PAGE, ...rest }) => {
  const { device } = useDeviceDimensions('Pagination');
  const maxPages = getMaxPages(device);
  const [totalPages, setTotalPages] = useState(maxPages);
  const [selectedPage, changeSelectedPage] = useState(currentPage);

  useEffect(() => {
    if (currentPage >= totalPages) {
      selectPage(totalPages - 1);
    } else if (currentPage < 0) {
      selectPage(0);
    } else {
      selectPage(currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, totalPages]);

  useEffect(() => {
    setTotalPages(Math.ceil(itemsCount / itemsPerPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsCount, itemsPerPage]);

  function selectPage(page) {
    if (page < 0 || page >= totalPages || page === selectedPage)
      return;

    changeSelectedPage(page);
    if (onPageChange)
      onPageChange(page);
  }

  const getPages = () => {
    if (totalPages < maxPages)
      return [...Array(totalPages)].map((empty, index) => index);

    // How many pages around the selected page should be rendered
    const PAGE_OFFSET = (maxPages - 1) / 2;
    let pages = [];

    let startPage = Math.max(0, selectedPage - PAGE_OFFSET);
    let endPage = Math.min(totalPages - 1, selectedPage + PAGE_OFFSET);

    // If we are at the beginning or the end
    // and we render less items than the max items (we want consistent pages)
    if (startPage === 0 && startPage + endPage + 2 <= maxPages)
      endPage += maxPages - endPage - 1;
    if (endPage === totalPages - 1 && endPage - startPage + 2 <= maxPages)
      startPage -= maxPages - endPage + startPage - 1;

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const renderPages = () =>
    getPages().map(pageNumber => {
      return (
        <PageItem
          key={pageNumber}
          className='page-number'
          isActive={selectedPage === pageNumber}
          onClick={() => selectPage(pageNumber)}
        >
          {pageNumber + 1}
        </PageItem>
      );
    });

  const isOverFlow = totalPages >= maxPages;

  function goPrevOrFirst() {
    if (!isOverFlow)
      selectPage(selectedPage - 1);
    else
      selectPage(0);
  }

  function goNextOrLast() {
    if (!isOverFlow)
      selectPage(selectedPage + 1);
    else
      selectPage(totalPages - 1);
  }

  if (!device) return null;
  return (
    <StyledPagination {...rest}>
      {totalPages > 0 &&
      <PageItem
        isDisabled={selectedPage === 0}
        disabled={selectedPage === 0}
        onClick={goPrevOrFirst}
      >
        {isOverFlow ? 'First' : 'Previous'}
      </PageItem>
      }
      {renderPages()}
      {totalPages > 0 &&
      <PageItem
        onClick={goNextOrLast}
        isDisabled={selectedPage === totalPages - 1}
        disabled={selectedPage === totalPages - 1}
      >
        {isOverFlow ? 'Last' : 'Next'}
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
