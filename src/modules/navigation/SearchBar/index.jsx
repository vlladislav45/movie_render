import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { Input } from 'components/basic';
import { updateFilter } from 'reducers/moviesReducer';
import { ReactComponent as SearchIcon } from 'assets/icons/search-24px.svg';

const SearchBar = props => {
  const dispatch = useDispatch();

  const handleChange = React.useCallback(debounce(e => {
    dispatch(updateFilter({ search: e.target.value }));
  }, 200), []);

  return (
    <Input
      {...props}
      onPrimary
      onChange={handleChange}
      className='search-input'
      leadingIcon={SearchIcon}
      label='Search'
    />
  );
};

export default SearchBar;
