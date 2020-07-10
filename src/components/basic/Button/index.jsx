import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { rippleConstants } from 'config/animationConstants';
import {
  ButtonWrapper,
  ContainedButton,
  TextButton,
  LeadingIcon,
} from './styles';

const { SMALL_RIPPLE_DURATION } = rippleConstants;
const Button = React.forwardRef((
  props,
  ref) => {

  const timeout = React.useRef(0);
  const time = React.useRef(0);
  const {
    type = 'contained', color = 'primary', disabled = false,
    Icon, text, children, onClick, onClickCapture, ...rest
  } = props;

  const [isPressed, setIsPressed] = useState(false);
  const [coordinates, setCoordinates] = useState();

  // Clear ripple timeout when unmounting
  useEffect(() => () => clearTimeout(timeout.current), []);

  useEffect(() => {
    if (isPressed)
      time.current = Date.now();
  }, [isPressed]);

  function mouseDown (evt) {
    const x = evt.clientX - evt.target.getBoundingClientRect().left;
    const y = evt.clientY - evt.target.getBoundingClientRect().top;
    // noinspection JSCheckFunctionSignatures
    setCoordinates({ x, y });
    setIsPressed(true);
  }

  function mouseUp (e) {
    if (!isPressed) return;
    cancelRipple();
  }

  function hoverOut () {
    if (!isPressed) return;
    cancelRipple();
  }

  function buttonClicked (e) {
    cancelRipple();

    if (onClick)
      onClick(e);
    if (onClickCapture)
      onClickCapture(e);

    e.stopPropagation();
  }

  function cancelRipple () {
    const timeLeft = Date.now() - time.current;
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setIsPressed(false);
    }, SMALL_RIPPLE_DURATION - timeLeft);
  }

  const buttonProps = {
    isActive: isPressed,
    coordinates: coordinates,
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
