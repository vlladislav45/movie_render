import React, { useState } from 'react';
import { DialogButton, DialogInput, DialogWrapper, ErrorText } from './styles';

interface EditInfoDialogProps {
  onConfirm: (newValue: string) => void,
  inputLabel: string,
  validator? :string,
  helperText? :string,
}
const DEFAULT_HELPER_TEXT = 'Leave empty to remove';
const EditInfoDialog = (props: EditInfoDialogProps) => {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  function handleClick() {
    if (props.validator && value !== '' && !value.match(props.validator)) {
      setError('Invalid value');
    } else {
      props.onConfirm(value.trim());
    }
  }
  return (
    <DialogWrapper>
      {error && <ErrorText>{error}</ErrorText>}
      <DialogInput
        // @ts-ignore
        autoFocus helperText={props.helperText || DEFAULT_HELPER_TEXT} onChange={e => setValue(e.target.value)}
        label={props.inputLabel}
      />
      {/* @ts-ignore */}
      <DialogButton onClick={handleClick}>Confirm</DialogButton>
    </DialogWrapper>
  );
};

export default EditInfoDialog;