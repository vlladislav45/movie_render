import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import { ACTIVE_RIPPLE_CLASS, RIPPLE_DURATION } from 'components/Styled/BaseRipple';
import { addRipple } from 'utils/rippleUtils';
import {
  ButtonWrapper,
  ContainedButton,
  TextButton,
  LeadingIcon,
} from './styles';

const Button = React.forwardRef((
  props,
  ref) => {
  const {
    id, type = 'contained', color = 'primary', disabled = false,
    Icon, text, children, onClick, ...rest
  } = props;
  
  const btnId = React.useMemo(() => id || `btn_${uniqueId()}`, [id]);
  
  useEffect(() => {
    const el = document.getElementById(btnId);
    if (el)
      addRipple(el);
  }, [btnId]);
  
  const buttonProps = {
    id: btnId,
    onClickCapture: onClick,
    disabled: disabled,
    color: color,
    withIcon: !!Icon,
    as: 'button',
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
  disabled: PropTypes.bool,
  text: PropTypes.string,
  Icon: PropTypes.elementType,
};

export default Button;
