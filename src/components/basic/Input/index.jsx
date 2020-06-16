import React, { useRef, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ErrorText, HelperText, OuterContainer } from './styles.js';
import FilledInput from './FilledInput';
import {
  InputLabel,
  StyledFilledInput,
  StyledFilledInputContainer,
} from './styles';

const Input = props => {
  const {
    leadingIcon: LeadingIcon, value: preFilledText = '',
    type, label, helperText, errorText,
    text, ...rest
  } = props;

  const id = useMemo(() => Input.nextId(), []);
  const inputRef = useRef();

  const [value, setValue] = useState(preFilledText);
  const [isFocused, setIsFocused] = useState(false);

  function renderBelowInput () {
    if (errorText)
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

  function focusInput () {
    if (isFocused)
      return;
    setIsFocused(true);
    inputRef.current.focus();
  }

  const withLeadingIcon = !!LeadingIcon;
  return (
    <OuterContainer
      id={id}
      onClick={focusInput}
      {...rest}
    >
      <StyledFilledInputContainer
        focused={isFocused}
        withLeadingIcon={withLeadingIcon}
      >
        {LeadingIcon && <LeadingIcon />}
        {label && <InputLabel
          htmlFor={id}
          elevated={isFocused || !!value}
          withLeadingIcon={withLeadingIcon}
        >
          {label}
        </InputLabel>}
        <StyledFilledInput
          ref={inputRef}
          onBlur={() => setIsFocused(false)}
          focused={isFocused}
          value={value}
          onChange={e => setValue(e.target.value)}
          withLeadingIcon={withLeadingIcon}
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
  leadingIcon: PropTypes.element,
};

Input.defaultProps = {
  type: 'filled',
};

Input.nextId = (() => {
  let id = 0;
  return () => `input_${id++}`;
})();

export default Input;
