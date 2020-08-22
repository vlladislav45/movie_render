import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { rippleConstants } from 'config/animationConstants';
import {
  ButtonWrapper,
  ContainedButton,
  TextButton,
  LeadingIcon,
} from './styles';

export const ACTIVE_RIPPLE_CLASS = 'activeRipple';
const { SMALL_RIPPLE_DURATION } = rippleConstants;
const Button = React.forwardRef((
  props,
  ref) => {
  
  const pressedTime = useRef();
  const {
    type = 'contained', color = 'primary', disabled = false,
    Icon, text, children, onClick, onClickCapture, ...rest
  } = props;
  
  const mouseDown = useCallback((evt) => {
    const button = evt.target;
    const rect = button.getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;
    
    pressedTime.current = Date.now();
    button.style.setProperty('--tx', `${x}px`);
    button.style.setProperty('--ty', `${y}px`);
    button.classList.add(ACTIVE_RIPPLE_CLASS);
    
  }, [])
  
  const mouseUp = useCallback((evt) => {
    const timeElapsed = Date.now() - pressedTime.current
    const button = evt.target;
    setTimeout(() => {
      button.classList.remove(ACTIVE_RIPPLE_CLASS);
    }, 1.8 * SMALL_RIPPLE_DURATION - timeElapsed);
  }, [])
  
  const hoverOut = useCallback((evt) => {
    const timeElapsed = Date.now() - pressedTime.current
    const button = evt.target;
    setTimeout(() => {
      button.classList.remove(ACTIVE_RIPPLE_CLASS);
    }, 1.8 * SMALL_RIPPLE_DURATION - timeElapsed);
  }, [])
  
  // TODO: Should i keep this?
  const buttonClicked = useCallback((e) => {
    if (onClick)
      onClick(e);
    if (onClickCapture)
      onClickCapture(e);
    
    e.stopPropagation();
  }, [onClick, onClickCapture])
  
  
  const buttonProps = {
    onMouseDownCapture: mouseDown,
    onMouseUpCapture: mouseUp,
    onMouseOut: hoverOut,
    onClickCapture: buttonClicked,
    disabled: disabled,
    color: color,
    withIcon: !!Icon,
  };
  
  return (
    <ButtonWrapper
      ref={ref}
      {...rest}
    >
      
      {type === 'contained' &&
      <ContainedButton
        {...buttonProps}
      >
        {Icon &&
        <LeadingIcon>
          <Icon/>
        </LeadingIcon>}
        {text || children}
      </ContainedButton>
      }
      {type === 'text' &&
      <TextButton
        {...buttonProps}
      >
        {Icon &&
        <LeadingIcon>
          <Icon/>
        </LeadingIcon>}
        {text || children}
      </TextButton>
      }
    </ButtonWrapper>
  );
});

Button.propTypes = {
  type: PropTypes.oneOf(['contained', 'outlined', 'text']),
  color: PropTypes.oneOf(['primary', 'secondary', 'surface']), //NOTE: surface should be used for dark theme only
  emphasis: PropTypes.oneOf(['high', 'medium', 'low']),
  disabled: PropTypes.bool,
  text: PropTypes.string,
  Icon: PropTypes.elementType,
};

export default Button;
