import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ErrorText, HelperText, InputContainer } from './styles.js';
import FilledInput from './FilledInput';
import { InputLabel } from './styles';

const Input = props => {
  const labelRef = useRef();
  const inputRef = useRef();

  const [isFocused, setIsFocused] = useState(false);
  const { type, label, helperText, errorText, text, ...rest } = props;

  useEffect(() => {

  }, [inputRef]);

  function renderBelowInput() {
    if ( errorText )
      return (
        <ErrorText>
          {errorText}
        </ErrorText>);
    else
      return (
        <HelperText>
          {helperText}
        </HelperText>);
  }

  function focusInput() {
    setIsFocused(true);
    inputRef.current.focus();
  }

  return (
    <InputContainer
      onClickCapture={focusInput}
      {...rest}
    >
      {label && <InputLabel
        ref={labelRef}
        labelRef={labelRef}
        inputRef={inputRef}
        focused={isFocused}
      >
        {label}
      </InputLabel>}
      {type === 'filled' && (
        <FilledInput
          ref={inputRef}
          labelText={label}
          onBlur={() => setIsFocused(false)}
        />
      )}
      {renderBelowInput()}
    </InputContainer>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf([ 'filled', 'textarea', 'outline' ]),
  label: PropTypes.string,
  helperText: PropTypes.string,
  errorText: PropTypes.string,
  text: PropTypes.string,
};

Input.defaultProps = {
  type: 'filled',
};

export default Input;