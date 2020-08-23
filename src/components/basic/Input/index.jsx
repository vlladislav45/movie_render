import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import useDeviceDimensions from 'hooks/useDeviceDimensions';
import { Loading } from 'components';
import FilledInput from './FilledInput';
import MultiLineInput from './MultiLine';
import { CharacterCount, ErrorText, HelperText, OuterContainer } from './baseStyles.js';

const Input = React.forwardRef((props, ref) => {
  const {
    leadingIcon: LeadingIcon, value: preFilledText = '',
    inputType, label, helperText, errorText,
    placeholder, onPrimary, withIconOnError,
    onChange, onChangeCapture, disabled, loading,
    autoFocus, autoFocusDelay, type,
    withCharacterCount, maxCharacterCount, ...rest
  } = props;
  
  const inputId = useMemo(() => Input.nextId(), []);
  
  const [value, setValue] = useState(preFilledText);
  const [error, setError] = useState(errorText);
  const [isFocused, setIsFocused] = useState(false);
  
  const { device } = useDeviceDimensions('Input');

  
  useEffect(() => setValue(preFilledText), [preFilledText]);
  
  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => {
        document.getElementById(inputId).focus()
      }, autoFocusDelay)
    }
  }, [autoFocus]);
  
  useEffect(() => {
    setError(errorText)
  }, [errorText])
  
  function renderBelowInput() {
    if (error)
      return (
        <ErrorText>
          {error}
        </ErrorText>);
    else if (helperText)
      return (
        <HelperText>
          {helperText}
        </HelperText>);
    else return null;
  }
  
  const textChanges = useCallback(e => {
    const { value: text } = e.target;
    if (withCharacterCount && text.length > maxCharacterCount) {
      setValue(text.slice(0, maxCharacterCount))
      e.preventDefault();
      return;
    }
    setValue(text);
    if (onChange)
      onChange(e);
    if (onChangeCapture)
      onChangeCapture(e);
    
    e.persist();
  }, [])
  
  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, [])
  
  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, [])
  
  
  const inputProps = useMemo(() => ({
    hasError: !!error,
    withLeadingIcon: !!LeadingIcon,
    rippleClass: isFocused ? 'activate' : '',
    shouldShowPlaceholder: isFocused || !label,
    onBlur: handleBlur,
    onFocus: handleFocus,
    onChange: textChanges,
    inputId, disabled, isFocused, label, LeadingIcon,
    withIconOnError, placeholder, value, onPrimary,
    device, type,
  }), [error, LeadingIcon, isFocused, inputId, disabled, label, withIconOnError, placeholder, value, onPrimary, device, type])
  
  return (
    <OuterContainer
      isMultiLine={inputType === 'textarea'}
      isDisabled={disabled}
      $device={device}
      $withBelowText={!!errorText || !!helperText || !!withCharacterCount}
      {...rest}
    >
      {loading && <Loading onlyCogWheel/>}
      {inputType === 'filled' && (
        <FilledInput
          ref={ref}
          {...inputProps}
        />
      )}
      {inputType === 'textarea' && (
        <MultiLineInput
          ref={ref}
          {...inputProps}
        />
      )}
      {renderBelowInput()}
      {withCharacterCount && (
        <CharacterCount>
          {`${value.length}/${maxCharacterCount || 255}`}
        </CharacterCount>
      )}
    </OuterContainer>
  );
});

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
  autoFocusDelay: PropTypes.number, //Delay the autofocus in milliseconds
  withCharacterCount: PropTypes.bool,
  maxCharacterCount: PropTypes.number,
};

Input.defaultProps = {
  inputType: 'filled',
  withIconOnError: true,
  onPrimary: false,
  disabled: false,
  autoFocus: false,
  autoFocusDelay: 0,
  withCharacterCount: false,
  maxCharacterCount: 255,
};

Input.nextId = (() => {
  let id = 0;
  return () => `input_${id++}`;
})();

Input.displayName = 'Input';
export default Input;
