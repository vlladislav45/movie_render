import React, { useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ErrorText, HelperText, OuterContainer } from './styles.js';
import { InputLabel, RippleElem, StyledFilledInput, StyledFilledInputContainer, } from './styles';

const Input = props => {
  const {
    leadingIcon: LeadingIcon, value: preFilledText = '',
    type, label, helperText, errorText,
    text, placeholder, ...rest
  } = props;

  const id = useMemo(() => Input.nextId(), []);
  const inputRef = useRef();

  const [ value, setValue ] = useState(preFilledText);
  const [ isFocused, setIsFocused ] = useState(false);

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
    if ( isFocused )
      return;
    setIsFocused(true);
    inputRef.current.focus();
  }

  const hasError = !!errorText;
  const withLeadingIcon = !!LeadingIcon;
  const rippleClass = isFocused ? 'activate' : '';

  return (
    <OuterContainer
      id={id}
      onClick={focusInput}
      {...rest}
    >
      <StyledFilledInputContainer
        error={hasError}
        focused={isFocused}
        withLeadingIcon={withLeadingIcon}
      >
        <RippleElem hasError={hasError} className={rippleClass}/>
        {LeadingIcon && <LeadingIcon/>}
        {label && <InputLabel
          htmlFor={id}
          elevated={isFocused || !!value}
          withLeadingIcon={withLeadingIcon}
        >
          {label}
        </InputLabel>}
        <StyledFilledInput
          ref={inputRef}
          focused={isFocused}
          value={value}
          onBlur={() => setIsFocused(false)}
          onChange={e => setValue(e.target.value)}
          withLeadingIcon={withLeadingIcon}
          placeholder={isFocused ? placeholder : ''}
          {...rest}
        />
      </StyledFilledInputContainer>
      {renderBelowInput()}
    </OuterContainer>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf([ 'filled', 'textarea', 'outline' ]),
  label: PropTypes.string,
  helperText: PropTypes.string,
  errorText: PropTypes.string,
  text: PropTypes.string,
  leadingIcon: PropTypes.oneOfType([ PropTypes.element, PropTypes.object ]),
};

Input.defaultProps = {
  type: 'filled',
};

Input.nextId = (() => {
  let id = 0;
  return () => `input_${id++}`;
})();

export default Input;
