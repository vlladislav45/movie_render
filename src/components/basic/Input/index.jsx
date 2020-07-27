import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'components';
import FilledInput from './FilledInput';
import MultiLineInput from './MultiLine';
import { ErrorText, HelperText, OuterContainer } from './baseStyles.js';

const Input = (props) => {
  const {
    leadingIcon: LeadingIcon, value: preFilledText = '',
    inputType, label, helperText, errorText,
    placeholder, id, onPrimary, withIconOnError,
    onChange, onChangeCapture, disabled, loading,
    autoFocus, ...rest
  } = props;

  const inputId = useMemo(() => Input.nextId(), []);
  const inputRef = useRef();

  const [value, setValue] = useState(preFilledText);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => setValue(preFilledText), [preFilledText]);

  useEffect(() => {
    if (autoFocus)
      setIsFocused(true);
  }, [autoFocus]);

  function renderBelowInput () {
    if (errorText)
      return (
        <ErrorText>
          {errorText}
        </ErrorText>);
    else if (helperText)
      return (
        <HelperText>
          {helperText}
        </HelperText>);
    else return null;
  }

  function textChanges (e) {
    setValue(e.target.value);
    if (onChange)
      onChange(e);
    if (onChangeCapture)
      onChangeCapture(e);

    e.persist();
  }

  const inputProps = {
    hasError: !!errorText,
    withLeadingIcon: !!LeadingIcon,
    rippleClass: isFocused ? 'activate' : '',
    shouldShowPlaceholder: isFocused || !label,
    onBlur: () => { setIsFocused(false); },
    onFocus: () => { setIsFocused(true); },
    onChange: textChanges,
    inputId, disabled, isFocused, label, LeadingIcon,
    withIconOnError, placeholder, value, onPrimary,
  };
  return (
    <OuterContainer
      isMultiLine={inputType === 'textarea'}
      isDisabled={disabled}
      id={id}
      {...rest}
    >
      {loading && <Loading/>}
      {inputType === 'filled' && (
        <FilledInput
          ref={inputRef}
          {...inputProps}
        />
      )}
      {inputType === 'textarea' && (
        <MultiLineInput
          ref={inputRef}
          {...inputProps}
        />
      )}
      {renderBelowInput()}
    </OuterContainer>
  );
};

Input.propTypes = {
  inputType: PropTypes.oneOf(['filled', 'textarea', 'outline']),
  label: PropTypes.string,
  helperText: PropTypes.string,
  errorText: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  leadingIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
  onPrimary: PropTypes.bool, // Flag to use secondary for accent instead of primary
  disabled: PropTypes.bool,
  withIconOnError: PropTypes.bool, // display icon when there is error
  loading: PropTypes.bool, // Display loading above the input
  autoFocus: PropTypes.bool, // Focus the input when mounted
};

Input.defaultProps = {
  inputType: 'filled',
  withIconOnError: true,
  onPrimary: false,
  disabled: false,
  autoFocus: false,
};

Input.nextId = (() => {
  let id = 0;
  return () => `input_${id++}`;
})();

export default Input;
