import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { rippleConstants } from 'config/constants';
import {
  ButtonWrapper,
  ContainedButton,
  TextButton,
  LeadingIcon,
} from './styles';

let time = 0;
let timeout;
const { SMALL_RIPPLE_DURATION } = rippleConstants;
const Button = React.forwardRef((props, ref) => {
  const {
    type = 'contained', color = 'primary', disabled = false,
    Icon, text, children, onClick, onClickCapture, ...rest
  } = props;

  const [isPressed, setIsPressed] = useState(false);
  const [coordinates, setCoordinates] = useState();

  // Clear ripple timeout when unmounting
  useEffect(() => () => clearTimeout(timeout));

  useEffect(() => {
    if (isPressed)
      time = Date.now();
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
    const timeLeft = Date.now() - time;
    // Workaround to ensure ripple animation will end
    if (timeLeft > 0 && timeLeft < SMALL_RIPPLE_DURATION)
      timeout = setTimeout(() => {
        setIsPressed(false);
      }, SMALL_RIPPLE_DURATION - timeLeft);
    else {
      setIsPressed(false);
    }
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
