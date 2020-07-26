import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Loading } from 'components';
import { Button, Input, Chip } from 'components/basic';
import { GenresRow, GenresWrapper } from './styles';

// TODO: Its the same as actors component
const Genres = () => {
  const {
    isLoading = false,
    genres: movieGenres = '',
  } = useSelector(({ moderatorReducer: { movieData } }) => ({
    isLoading: movieData.isLoading,
    genres: movieData.Genre,
  }));

  const [inputValue, setInputValue] = useState('');
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    if (movieGenres)
      setGenres(movieGenres.split(','));
  }, [movieGenres]);

  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      addActor(e);
    }
  }

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  function addActor(e) {
    e.preventDefault();
    setInputValue('');
    setGenres([...genres, inputValue]);
  }

  const isActorPresent = genres.filter(actor => actor.toLowerCase() === inputValue.toLowerCase()).length !== 0;
  const isBtnDisabled = inputValue.length === 0 || isActorPresent;
  const error = isActorPresent ? 'Actor already added' : '';
  return (
    <GenresWrapper>
      {isLoading && <Loading/>}
      <GenresRow>
        <Input
          label='Add Actor'
          helperText='Use this only if the recommended genres are not correct'
          errorText={error}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <Button
          text='Add'
          disabled={isBtnDisabled}
          onClick={addActor}
        />
      </GenresRow>
      <GenresRow>
        {genres && genres.map(g => (
          <Chip
            key={g}
            chipText={g}
            onClose={() => setGenres(genres.filter(genre => genre !== g))}
          />
        ))}
      </GenresRow>
    </GenresWrapper>
  );
};

export default Genres;