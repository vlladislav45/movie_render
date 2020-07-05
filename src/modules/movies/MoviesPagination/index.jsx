import React, { useEffect, useState } from 'react';
import { useLocation, withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'query-string';
import { Pagination } from 'components';
import {
  changeMoviesPerPage,
  changeSelectedPage,
} from 'reducers/moviesReducer';

const MoviesPagination = ({ history, style, className }) => {
  const dispatch = useDispatch();
  const { search, pathname } = useLocation();

  const { count, selectedPage, moviesPerPage } = useSelector(
    ({ moviesReducer }) => ({
      count: moviesReducer.count,
      selectedPage: moviesReducer.selectedPage,
      moviesPerPage: moviesReducer.moviesPerPage,
    }));

  const [currentPage, setCurrentPage] = useState(selectedPage);

  useEffect(() => {
    const query = qs.parse(search);
    if (query.items && !isNaN(Number(query.items))) {
      dispatch(changeMoviesPerPage((Number(query.items))));
    }
    if (query.page && !isNaN(Number(query.page))) {
      setCurrentPage(Number(query.page) - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  function changePage (page) {
    history.push(pathname + `?page=${page + 1}&items=${moviesPerPage}`);
    dispatch(changeSelectedPage(page));
  }

  return (
    <div style={style} className={className}>
      <Pagination
        onPageChange={changePage}
        itemsCount={count}
        currentPage={currentPage}
        itemsPerPage={moviesPerPage}
      />
    </div>
  );

};

export default withRouter(MoviesPagination);
