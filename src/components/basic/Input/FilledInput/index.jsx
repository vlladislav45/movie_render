import React from 'react';
import { ErrorIcon, RippleElem } from '../baseStyles';
import { InputLabel, StyledFilledInput, StyledFilledInputContainer, } from './styles';

export default React.forwardRef((props,
  ref) => {

  const {
    disabled, focusInput, hasError,
    isFocused, withLeadingIcon, onPrimary,
    rippleClass, inputId, label, LeadingIcon,
    onBlur, onFocus, onChange, withIconOnError,
    shouldShowPlaceholder, placeholder, value,
    device,
    ...rest
  } = props;

  return (
    <StyledFilledInputContainer
      disabled={disabled}
      onClick={focusInput}
      error={hasError}
      focused={isFocused}
      withLeadingIcon={withLeadingIcon}
      isOnPrimary={onPrimary}
    >
      {LeadingIcon && <LeadingIcon className='leading-icon'/>}
      {label && <InputLabel
        htmlFor={inputId}
        elevated={isFocused || !!value}
        isFocused={isFocused}
        withLeadingIcon={withLeadingIcon}
        hasError={hasError}
        isOnPrimary={onPrimary}
        $device={device}
      >
        {label}
      </InputLabel>}
      <StyledFilledInput
        id={inputId}
        disabled={disabled}
        ref={ref}
        hasError={hasError}
        focused={isFocused}
        value={value}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChange}
        isOnPrimary={onPrimary}
        withLeadingIcon={withLeadingIcon}
        placeholder={shouldShowPlaceholder ? placeholder : ''}
        {...rest}
      />
      {withIconOnError && hasError && <ErrorIcon/>}
      <RippleElem
        hasError={hasError}
        className={rippleClass}
        isOnPrimary={onPrimary}
      />
    </StyledFilledInputContainer>
  );
});
