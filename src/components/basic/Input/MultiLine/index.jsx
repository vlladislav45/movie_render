import React from 'react';
import {
  Label,
  MultiLineInput,
  MultiLineInputContainer,
} from './styles';
import { RippleElem } from '../baseStyles.js';

export default React.forwardRef((props, ref) => {
  const {
    hasError, rippleClass, onPrimary,
    inputId, label, isFocused,
    value, withLeadingIcon,
    onFocus, onChange, onBlur,
  } = props;
  return (
    <MultiLineInputContainer
      focused={isFocused}
    >
      <RippleElem
        hasError={hasError}
        className={rippleClass}
        isOnPrimary={onPrimary}
      />
      <Label
        htmlFor={inputId}
        elevated={isFocused || !!value}
        isFocused={isFocused}
        withLeadingIcon={withLeadingIcon}
        hasError={hasError}
        isOnPrimary={onPrimary}
      >{label}</Label>
      <MultiLineInput
        id={inputId}
        ref={ref}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        isOnPrimary={onPrimary}
      />
    </MultiLineInputContainer>
  );
});
