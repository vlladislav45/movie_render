import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'components/basic';
import { Loading } from 'components';
import DataChip from './DataChip';
import { Row, Wrapper } from './styles';

const AddMultipleChips = props => {
  const {
    isLoading, data, updateData,
    inputLabel, inputHelperText,
  } = props;

  const [inputValue, setInputValue] = useState('');

  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      addData(e);
    }
  }

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }


  const isPresent = data.filter(d => d.toLowerCase() === inputValue.toLowerCase()).length !== 0;
  const disableAdding = inputValue.trim().length === 0 || isPresent;
  const error = isPresent ? 'Actor already added' : '';

  function addData(e) {
    e.preventDefault();
    if (disableAdding) return;
    setInputValue('');
    updateData([...data, inputValue]);
  }

  function removeData(dataToRemove) {
    updateData(data.filter(d => d !== dataToRemove))
  }

  return (
    <Wrapper>
      {isLoading && <Loading/>}
      <Row>
        <Input
          label={inputLabel}
          helperText={inputHelperText}
          errorText={error}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <Button
          text='Add'
          disabled={disableAdding}
          onClick={addData}
        />
      </Row>
      <Row>
        {data && data.map(d => (
          <DataChip
            text={d}
            onClose={removeData}
          />
        ))}
      </Row>
    </Wrapper>
  );
};

AddMultipleChips.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.array, // Array with the data to be rendered in chips
  updateData: PropTypes.func, // Mutator function for data prop
  inputLabel: PropTypes.string,
  inputHelperText: PropTypes.string,
}

export default AddMultipleChips;