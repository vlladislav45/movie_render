import React from 'react';
import { Label, MultiLineInput, MultiLineInputContainer, MultiLineRipple, } from './styles';

export default React.forwardRef((props, ref) => {
  const {
    hasError, rippleClass, onPrimary,
    inputId, label, isFocused,
    value, withLeadingIcon,
    onFocus, onChange, onBlur,
    ...rest
  } = props;

  return (
    <MultiLineInputContainer
      focused={isFocused}
      isOnPrimary={onPrimary}
    >
      <MultiLineRipple
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
        value={value}
        {...rest}
      />
    </MultiLineInputContainer>
  );
});
