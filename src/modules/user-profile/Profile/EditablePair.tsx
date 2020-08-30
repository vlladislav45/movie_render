import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { closeDialog, openDialog } from 'reducers/uiReducer';
import EditInfoDialog from './EditInfoDialog';
import { EditableInfoLabel, EditableInfoValue, EditBtn } from './styles';

interface EditablePairProps {
  label :string,
  value :string,
  onChange :(pairLabel:string, newValue: string) => void,
  pairLabelRaw: string, // the label to identify the parameter being edited
  validator? :string, // regex to match
  helperText? :string,
}
const EditablePair = (props :EditablePairProps) => {
  const dispatch = useDispatch();
  const { label, value, onChange, pairLabelRaw, validator, helperText } = props;

  const handleChange = useCallback((newValue:string) => {
    dispatch(closeDialog());
    onChange(pairLabelRaw, newValue);
  }, [pairLabelRaw, onChange])

  const handleClick = useCallback(() => {
    dispatch(openDialog(
      <EditInfoDialog validator={validator} onConfirm={handleChange} inputLabel={label}  helperText={helperText}/>
    ))
  }, [label, handleChange])

  return (
    <>
      <EditableInfoLabel>{label}</EditableInfoLabel>
      <EditableInfoValue onClick={handleClick}>{value} <EditBtn /></EditableInfoValue>
    </>
  );
};

export default React.memo(EditablePair);