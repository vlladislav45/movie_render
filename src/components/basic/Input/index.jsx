import React, { useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ErrorText, HelperText, OuterContainer } from './styles.js';
import { InputLabel, RippleElem, StyledFilledInput, StyledFilledInputContainer, } from './styles';

const Input = props => {
  const {
    leadingIcon: LeadingIcon, value: preFilledText = '',
    type, label, helperText, errorText,
    text, placeholder, id, ...rest
  } = props;

  const inputId = useMemo(() => id || Input.nextId(), []);
  const inputRef = useRef();

  const [value, setValue] = useState(preFilledText);
  const [isFocused, setIsFocused] = useState(false);

  function renderBelowInput() {
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

  function focusInput() {
    if (isFocused)
      return;
    setIsFocused(true);
    inputRef.current.focus();
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
      >
        <RippleElem hasError={hasError} className={rippleClass}/>
        {LeadingIcon && <LeadingIcon/>}
        {label && <InputLabel
          htmlFor={inputId}
          elevated={isFocused || !!value}
          withLeadingIcon={withLeadingIcon}
          hasError={hasError}
        >
          {label}
        </InputLabel>}
        <StyledFilledInput
          ref={inputRef}
          hasError={hasError}
          focused={isFocused}
          value={value}
          onBlur={() => setIsFocused(false)}
          onChange={e => setValue(e.target.value)}
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
};

Input.defaultProps = {
  type: 'filled',
};

Input.nextId = (() => {
  let id = 0;
  return () => `input_${id++}`;
})();

export default Input;
