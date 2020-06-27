import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonWrapper, ContainedButton, TextButton, LeadingIcon } from './styles';

const RIPPLE_DURATION = 300;
let time = 0;
let timeout;
const Button = React.forwardRef((props, ref) => {
  const {
    type = 'contained', color = 'primary', disabled = false,
    Icon, text, children, ...rest
  } = props;

  const [isPressed, setIsPressed] = useState(false);
  const [coordinates, setCoordinates] = useState();

  // Clear ripple timeout when unmounting
  useEffect(() => () => clearTimeout(timeout));

  useEffect(() => {
    if (isPressed)
      time = Date.now();
  }, [isPressed]);

  function buttonClicked (evt) {
    const x = evt.clientX - evt.target.getBoundingClientRect().left;
    const y = evt.clientY - evt.target.getBoundingClientRect().top;
    // noinspection JSCheckFunctionSignatures
    setCoordinates({ x, y });
    setIsPressed(true);
  }

  function buttonNotPressed () {
    const timeLeft = Date.now() - time;
    // Workaround to ensure ripple animation will end
    if (timeLeft > 0 && timeLeft < RIPPLE_DURATION)
      timeout = setTimeout(() => {
        setIsPressed(false);
      }, RIPPLE_DURATION - timeLeft);
    else {
      setIsPressed(false);
    }
  }

  const buttonProps = {
    isActive: isPressed,
    coordinates: coordinates,
    onMouseDown: buttonClicked,
    onMouseUp: buttonNotPressed,
    onMouseOut: buttonNotPressed,
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
            <Icon />
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
  type: PropTypes.oneOf(['contained, outlined, text']),
  color: PropTypes.oneOf(['primary', 'secondary']),
  emphasis: PropTypes.oneOf(['high', 'medium', 'low']),
  disabled: PropTypes.bool,
  text: PropTypes.string,
  Icon: PropTypes.elementType,
};

export default Button;
