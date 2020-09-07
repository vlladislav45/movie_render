import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import qs from 'query-string';
import { Pagination } from 'components';
import { changeMoviesPerPage, changeSelectedPage, getMoviesCount, } from 'reducers/moviesReducer';

const selector = createSelector(
  store => store.moviesReducer,
  ({ count, selectedPage, moviesPerPage }) => ({
    count, selectedPage, moviesPerPage
  }))
const MoviesPagination = ({ style, className, onPageChange }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { search, pathname } = location;
  
  const {
    count = 0,
    selectedPage = 0,
    moviesPerPage,
  } = useSelector(selector);
  
  const [currentPage, setCurrentPage] = useState(selectedPage);
  
  function parseQuery() {
    const query = qs.parse(search);
    const items = Number(query.items);
    let page = Number(query.page);
    if (!isNaN(items) && items !== moviesPerPage) {
      dispatch(changeMoviesPerPage(items));
    }
    if (!isNaN(page)) {
      if (page <= 1) dispatch(changeSelectedPage(0));
      else if (page !== currentPage + 1) {
        if (count > 0 && page >= Math.ceil(count / moviesPerPage)) page = Math.ceil(count / moviesPerPage)
        setCurrentPage(page - 1);
        dispatch(changeSelectedPage(page - 1));
      }
    } else {
      dispatch(changeSelectedPage(0))
    }
  }
  
  useEffect(() => {
    dispatch(getMoviesCount());
  }, [])
  
  useEffect(() => {
    if (!search) {
      dispatch(changeSelectedPage(0));
      return;
    }
    parseQuery();
  }, [search])
  
  useLayoutEffect(() => {
    if (selectedPage !== currentPage) {
      onPageChange(selectedPage, currentPage);
      history.push(pathname + `?page=${selectedPage + 1}&items=${moviesPerPage}`);
      setCurrentPage(selectedPage);
    }
  }, [selectedPage])
  
  function changePage(page) {
    if (page !== selectedPage)
      dispatch(changeSelectedPage(page));
  }
  
  if (count <= 0) return null;
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

export default MoviesPagination;
