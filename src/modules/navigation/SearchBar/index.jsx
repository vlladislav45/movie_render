import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { updateFilter } from 'reducers/moviesReducer';
import browserHistory from 'utils/browserHistory';
import { ReactComponent as SearchIcon } from 'assets/icons/search-24px.svg';
import {
  EXTEND_STATES,
  SearchInput,
  SearchInputContainer,
  StyledSearchBar,
  ToggleButton
} from './styles';

/**
 * Expandable searchbar
 * Idea about 3 values extended state https://stackoverflow.com/a/50428572
 */
const { EXTENDED, NOT_EXTENDED, INITIAL } = EXTEND_STATES;
const SearchBar = props => {
  const dispatch = useDispatch();
  
  const handleChange = React.useCallback(debounce(e => {
    dispatch(updateFilter({ searchMovie: e.target.value }));
  }, 200), []);
  
  const [extendedState, setExtendedState] = useState(INITIAL);
  
  // We attach the event listener ONLY when we extend the searchbar
  useEffect(() => {
    if (extendedState !== EXTENDED) return;
    const click = (e) => {
      // This may be outside the search-container or the TopNavBar, TODO: Decide which one
      if (e.target.closest('#search-container') === null)
        setExtendedState(state => {
          if (state === INITIAL)
            return state;
          return state === EXTENDED ? NOT_EXTENDED : state;
        });
    }
    window.addEventListener('click', click);
    return () => window.removeEventListener('click', click);
  }, [extendedState])
  
  const { search = '' } = useSelector(({ moviesReducer: { filters } }) => ({
    search: filters.searchMovie,
  }));
  
  
  return (
    <StyledSearchBar
      id='search-container'
      {...props}
    >
      <ToggleButton
        className='navbar-action'
        onClick={() => setExtendedState(isExtended => isExtended % 2 + 1)}
        extendedstate={extendedState}
      />
      <SearchInputContainer
        extendedstate={extendedState}
      >
        <SearchInput
          autoFocus={extendedState === EXTENDED}
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
