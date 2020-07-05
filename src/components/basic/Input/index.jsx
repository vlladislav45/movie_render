import React, { useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ErrorText, HelperText, OuterContainer } from './styles.js';
import {
  InputLabel,
  RippleElem,
  StyledFilledInput,
  StyledFilledInputContainer,
} from './styles';

const Input = props => {
  const {
    leadingIcon: LeadingIcon, value: preFilledText = '',
    type, label, helperText, errorText,
    text, placeholder, id, onPrimary = false,
    onChange, onChangeCapture, ...rest
  } = props;

  const inputId = useMemo(() => id || Input.nextId(), [id]);
  const inputRef = useRef();

  const [value, setValue] = useState(preFilledText);
  const [isFocused, setIsFocused] = useState(false);

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

  function focusInput () {
    if (isFocused)
      return;
    setIsFocused(true);
    inputRef.current.focus();
  }

  function textChanges(e) {
    setValue(e.target.value);
    if (onChange)
      onChange(e);
    if (onChangeCapture)
      onChangeCapture(e);

    e.stopPropagation();
  }

  const hasError = !!errorText;
  const withLeadingIcon = !!LeadingIcon;
  const rippleClass = isFocused ? 'activate' : '';
  const shouldShowPlaceholder = isFocused || !label;
  return (
    <OuterContainer
      id={inputId}
      {...rest}
    >
      <StyledFilledInputContainer
        onClick={focusInput}
        error={hasError}
        focused={isFocused}
        withLeadingIcon={withLeadingIcon}
        isOnPrimary={onPrimary}
      >
        <RippleElem
          hasError={hasError}
          className={rippleClass}
          isOnPrimary={onPrimary}
        />
        {LeadingIcon && <LeadingIcon/>}
        {label && <InputLabel
          htmlFor={inputId}
          elevated={isFocused || !!value}
          isFocused={isFocused}
          withLeadingIcon={withLeadingIcon}
          hasError={hasError}
          isOnPrimary={onPrimary}
        >
          {label}
        </InputLabel>}
        <StyledFilledInput
          ref={inputRef}
          hasError={hasError}
          focused={isFocused}
          value={value}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          onChange={textChanges}
          withLeadingIcon={withLeadingIcon}
          placeholder={shouldShowPlaceholder ? placeholder : ''}
          {...rest}
        />
      </StyledFilledInputContainer>
      {renderBelowInput()}
    </OuterContainer>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf(['filled', 'textarea', 'outline']),
  label: PropTypes.string,
  helperText: PropTypes.string,
  errorText: PropTypes.string,
  text: PropTypes.string,
  leadingIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
  onPrimary: PropTypes.bool, // Flag to use secondary for accent instead of primary
};

Input.defaultProps = {
  type: 'filled',
};

Input.nextId = (() => {
  let id = 0;
  return () => `input_${id++}`;
})();

export default Input;
