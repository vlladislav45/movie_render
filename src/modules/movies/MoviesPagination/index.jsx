import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MOVIES_PER_PAGE } from 'config/MoviesConfig';
import { Pagination } from 'components';
import { changeSelectedPage } from 'reducers/moviesReducer';

const MoviesPagination = () => {
  const dispatch = useDispatch();

  const { count, selectedPage } = useSelector(({ moviesReducer }) => ({
    count: moviesReducer.count,
    selectedPage: moviesReducer.selectedPage,
  }));

  function changePage(page) {
    dispatch(changeSelectedPage(page));
  }

  return (
    <div>
      <Pagination
        onPageChange={changePage}
        itemsCount={count}
        currentPage={selectedPage}
        itemsPerPage={MOVIES_PER_PAGE}
      />
    </div>
  );

};

export default MoviesPagination;