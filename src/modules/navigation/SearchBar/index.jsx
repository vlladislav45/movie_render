import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { Input } from 'components/basic';
import { updateFilter } from 'reducers/moviesReducer';
import browserHistory from 'utils/browserHistory';
import { ReactComponent as SearchIcon } from 'assets/icons/search-24px.svg';

const SearchBar = props => {
  const dispatch = useDispatch();

  const handleChange = React.useCallback(debounce(e => {
    dispatch(updateFilter({ search: e.target.value }));
  }, 200), []);

  const { search = '' } = useSelector(({ moviesReducer: { filters }}) => ({
    search: filters.search,
  }));


  return (
    <Input
      {...props}
      disabled={browserHistory.location.pathname !== '/'}
      onPrimary
      onChange={handleChange}
      value={search}
      className='search-input'
      leadingIcon={SearchIcon}
      label='Search'
    />
  );
};

export default SearchBar;
