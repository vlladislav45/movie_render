import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'query-string';
import { Pagination } from 'components';
import {
  changeMoviesPerPage,
  changeSelectedPage,
} from 'reducers/moviesReducer';

const MoviesPagination = ({ history, location, style, className }) => {
  const dispatch = useDispatch();
  const { search, pathname } = location;

  const {
    count = 0,
    selectedPage = 0,
    moviesPerPage,
  } = useSelector(
    ({ moviesReducer }) => ({
      count: moviesReducer.count,
      selectedPage: moviesReducer.selectedPage,
      moviesPerPage: moviesReducer.moviesPerPage,
    }));

  const [currentPage, setCurrentPage] = useState(selectedPage);
  
  useEffect(() => {
    const query = qs.parse(search);
    if (query.items && !isNaN(Number(query.items)) && Number(query.items) !==
      moviesPerPage) {
      dispatch(changeMoviesPerPage((Number(query.items))));
    }
    if (query.page && !isNaN(Number(query.page)) && Number(query.page) !==
      currentPage + 1) {
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
