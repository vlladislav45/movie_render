import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useDeviceDimensions from 'hooks/useDeviceDimensions';
import { L, M, SM, XL, XS_SM } from 'utils/mediaUtils';
import PageItem from './PageItem';
import { StyledPagination } from './styles';

// Fallback
const DEFAULT_ITEMS_PER_PAGE = 3;

// ONLY ODD NUMBERS
function getMaxPages(device) {
  switch (device) {
    case XS_SM:
      return 1;
    case SM:
      return 3;
    case M:
      return 5;
    case L:
      return 9;
    case XL:
      return 15;
    default: // FullHD and above
      return 25;
  }
}

const Pagination = ({
                      itemsCount, onPageChange, currentPage = 0,
                      itemsPerPage = DEFAULT_ITEMS_PER_PAGE, ...rest
                    }) => {
  const { device } = useDeviceDimensions('Pagination');
  const maxPages = React.useMemo(() => getMaxPages(device), [device]);
  const [totalPages, setTotalPages] = useState(null);
  const [selectedPage, changeSelectedPage] = useState(currentPage);
  
  useEffect(() => {
    if (currentPage >= totalPages) {
      changeSelectedPage(totalPages - 1);
    } else if (currentPage < 0) {
      changeSelectedPage(0);
    } else {
      changeSelectedPage(currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, totalPages]);
  
  useEffect(() => {
    // noinspection JSCheckFunctionSignatures
    setTotalPages(Math.ceil(itemsCount / itemsPerPage));
  }, [itemsCount, itemsPerPage]);
  
  useEffect(() => {
    if (selectedPage < 0 || selectedPage >= totalPages || !onPageChange)
      return;
    
    onPageChange(selectedPage)
  }, [selectedPage])
  
  
  const getPages = useCallback(() => {
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
  }, [totalPages, maxPages, selectedPage]);
  
  const handlePageClick = useCallback(pageToSelect => {
    changeSelectedPage(() => pageToSelect)
  }, []);
  
  const renderPages = useCallback(() =>
    getPages().map(pageNumber => {
      return (
        <PageItem
          key={pageNumber}
          className='page-number'
          isActive={selectedPage === pageNumber}
          onClick={handlePageClick}
          page={pageNumber}
        />
      );
    }), [getPages, selectedPage]);
  
  const isOverFlow = useMemo(() => totalPages >= maxPages, [totalPages, maxPages]);
  
  const goPrevOrFirst = useCallback(() => {
    if (!isOverFlow)
      changeSelectedPage(current => current - 1);
    else
      changeSelectedPage(() => 0);
  }, [])
  
  const goNextOrLast = useCallback(() => {
    if (!isOverFlow)
      changeSelectedPage(current => current + 1);
    else
      changeSelectedPage(() => totalPages - 1);
  }, []);
  
  
  if (!device || !maxPages) return null;
  
  return (
    <StyledPagination {...rest}>
      {totalPages > 0 &&
        <PageItem
          isDisabled={selectedPage === 0}
          disabled={selectedPage === 0}
          onClick={goPrevOrFirst}
          page={isOverFlow ? 'First' : 'Previous'}
        />
      }
      {renderPages()}
      {totalPages > 0 &&
        <PageItem
          onClick={goNextOrLast}
          isDisabled={selectedPage === totalPages - 1}
          disabled={selectedPage === totalPages - 1}
          page={isOverFlow ? 'Last' : 'Next'}
        />
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
