import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { Input } from 'components/basic';
import { getSuggestionData, suggestTitles } from 'reducers/moderatorReducer';
import { InputWrapper, SuggestionItem, Suggestions } from './styles';
import Suggestion from './Suggestion';

const MovieTitleInput = props => {
  const dispatch = useDispatch();
  const handleChange = useCallback(debounce(e => {
    setTitleValue(e.target.value);
    dispatch(suggestTitles(e.target.value));
  }, 300), []);

  const {
    suggestedMovies = [],
    movieData,
  } = useSelector(({ moderatorReducer }) => ({
    suggestedMovies: moderatorReducer.movies,
    movieData: moderatorReducer.movieData,
  }));

  const [titleValue, setTitleValue] = useState(movieData.Title);
  const [showSuggestion, setShowSuggestions] = useState(
    suggestedMovies.length > 0);

  useEffect(() => {
    setShowSuggestions(suggestedMovies.length > 0);
  }, [suggestedMovies]);

  useEffect(() => {
    setTitleValue(movieData.Title);
  }, [movieData.Title]);

  function getSuggestion (id) {
    dispatch(getSuggestionData(id));
    setShowSuggestions(false);
  }

  return (
    <InputWrapper>
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
        {suggestedMovies.map(m => (
          <Suggestion
            key={m.imdbID}
            title={m.Title}
            id={m.imdbID}
            handleClick={getSuggestion}
          />
        ))}
      </Suggestions>
    </InputWrapper>
  );
};

export default MovieTitleInput;
