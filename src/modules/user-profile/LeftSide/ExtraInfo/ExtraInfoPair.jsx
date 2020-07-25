import React from 'react';
import { useDispatch } from 'react-redux';
import { startCase } from 'lodash';
import { promptUser } from 'reducers/uiReducer';
import {
  EditBtn,
  ExtraInfoKey,
  ExtraInfoValue,
} from './styles';

const UNKNOWN = 'Not specified';

export default ({ pairKey, value, onChange }) => {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(promptUser({
      type: 'compact',
      isOpen: true,
      title: 'Enter a value',
      text: '',
      formField: true,
      formFieldData: {
        inputType: 'filled',
        label: `Enter ${startCase(pairKey)}`,
        value: value || '',
        helperText: 'Leave empty to remove',
        onPrimary: true,
      },
      onConfirm: newValue => onChange(newValue),
    }))
  }

  return (
    <>
      <ExtraInfoKey>{startCase(pairKey)}:</ExtraInfoKey>
      <ExtraInfoValue
        title='Click to change'
        onClick={handleClick}
      >
        {value || UNKNOWN}
        <EditBtn/>
      </ExtraInfoValue>
    </>
  );
};
