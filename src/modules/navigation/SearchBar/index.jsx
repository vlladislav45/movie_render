import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { updateFilter } from 'reducers/moviesReducer';
import browserHistory from 'utils/browserHistory';
import { ReactComponent as SearchIcon } from 'assets/icons/search-24px.svg';
import { SearchInput, SearchInputContainer, StyledSearchBar, ToggleButton } from './styles';

/**
 * Expandable searchbar
 * Idea about 3 values extended state https://stackoverflow.com/a/50428572
 */
export const INITIAL = 0, EXTENDED = 1, NOT_EXTENDED = 2;
const SearchBar = props => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  
  const handleChange = React.useCallback(debounce(e => {
    dispatch(updateFilter({ search: e.target.value }));
  }, 200), []);
  
  const [extendedState, setExtendedState] = useState(INITIAL);
  
  useEffect(() => {
    console.log(extendedState)
    if (extendedState === EXTENDED)
      inputRef.current.focus();
  }, [extendedState]);
  
  useEffect(() => {
    const click = (e) => {
      if (e.target.closest('#search-container') === null)
        setExtendedState(state => {
          if (state === INITIAL)
            return state;
          return state === EXTENDED ? NOT_EXTENDED : state;
        });
    }
    window.addEventListener('click', click);
    return () => window.removeEventListener('click', click);
  }, [])
  
  const { search = '' } = useSelector(({ moviesReducer: { filters } }) => ({
    search: filters.search,
  }));
  
  
  return (
    <StyledSearchBar
      id='search-container'
      {...props}
    >
      <ToggleButton
        onClick={() => setExtendedState(isExtended => isExtended % 2 + 1)}
        extendedstate={extendedState}
      />
      <SearchInputContainer
        extendedstate={extendedState}
      >
        <SearchInput
          ref={inputRef}
          disabled={browserHistory.location.pathname !== '/'}
          onPrimary
          onChange={handleChange}
          value={search}
          leadingIcon={SearchIcon}
          label='Search'
        />
      </SearchInputContainer>
    </StyledSearchBar>
  );
};

export default SearchBar;
