import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { Input } from 'components/basic';
import { Loading } from 'components';
import { clearSuggestions, getSuggestionData, suggestTitles } from 'reducers/moderatorReducer';
import Suggestion from './Suggestion';
import { InputWrapper, Suggestions, SuggestionsError } from './styles';

const MovieTitleInput = props => {
  const dispatch = useDispatch();
  const handleChange = useCallback(debounce(e => {
    setTitleValue(e.target.value);
    setShowSuggestions(true);
    dispatch(suggestTitles(e.target.value));
  }, 300), []);

  const {
    suggestedMovies = [],
    movieData,
    isLoading,
    error,
    totalResults,
  } = useSelector(({ moderatorReducer }) => ({
    suggestedMovies: moderatorReducer.movies,
    movieData: moderatorReducer.movieData,
    isLoading: moderatorReducer.isLoading,
    error: moderatorReducer.error,
    totalResults: moderatorReducer.totalResults,
  }));

  const [titleValue, setTitleValue] = useState(movieData.Title);
  const [showSuggestion, setShowSuggestions] = useState(false);

  useEffect(() => {
    setTitleValue(movieData.Title);
  }, [movieData.Title]);

  function getSuggestion(id) {
    dispatch(getSuggestionData(id));
    dispatch(clearSuggestions());
    setShowSuggestions(false);
  }

  function loadNextPage() {
    const ITEMS_PER_PAGE = 10;
    const nextPage = (suggestedMovies.length / ITEMS_PER_PAGE) + 1;
    dispatch(suggestTitles(titleValue, nextPage));
  }

  function handleKeyUp(e) {
    e.preventDefault();
    e.stopPropagation();

    // Arrow up
    if (e.keyCode === 38) {
      const nextFocusedEl = e.target.previousSibling || e.target.parentNode.lastChild;
      nextFocusedEl.focus();
    } else if (e.keyCode === 40) { // Arrow down
      const nextFocusedEl = e.target.nextSibling || e.target.parentNode.firstChild;
      nextFocusedEl.focus();
    } else if (e.keyCode === 13) {
      getSuggestion(e.target.id);
    }
  }

  return (
    <InputWrapper
    >
      <Input
        label='Movie title*'
        helperText='*Required. Start typing then select the desired movie from the list'
        onChange={handleChange}
        value={titleValue}
        loading={movieData.isLoading}
        autoComplete="off"
      />
      <Suggestions
        isShown={showSuggestion}
      >
        {isLoading && <Loading/>}
        {error && <SuggestionsError>{error}</SuggestionsError>}
        {suggestedMovies.map((suggestion, index) => (
          <Suggestion
            hocProps={{
              id: suggestion.imdbID,
              onKeyUpCapture: handleKeyUp,
              tabIndex: index,
            }}
            tag='li'
            key={suggestion.imdbID}
            title={suggestion.Title}
            id={suggestion.imdbID}
            handleClick={getSuggestion}
          />
        ))}
        {/*TODO:*/}
        {suggestedMovies.length > 0 && totalResults > suggestedMovies.length &&
        <Suggestion
          style={{ textAlign: 'center' }}
          handleClick={loadNextPage}
          title='Load more'
          tag='li'
        />
        }
      </Suggestions>
    </InputWrapper>
  );
};

export default MovieTitleInput;
