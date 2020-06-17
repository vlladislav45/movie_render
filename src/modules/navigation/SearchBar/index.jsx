import React from 'react';
import { Input } from 'components/basic';
import { ReactComponent as SearchIcon } from 'assets/icons/search-24px.svg';

const SearchBar = () => {
  return (
    <Input leadingIcon={SearchIcon} label='Search'/>
  );
};

export default SearchBar;
