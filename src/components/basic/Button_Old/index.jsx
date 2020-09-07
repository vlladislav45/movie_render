import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import { addRipple } from 'utils/rippleUtils';
import { ButtonWrapper, ContainedButton, LeadingIcon, TextButton, } from './styles';

// const ContainedButton = React.lazy(() => import(''))
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
  
  useEffect(() => {
    if (rest.test) {
    console.group('UPDATED BUTTON');
      console.log(text)
      console.log(buttonProps)
    console.groupEnd();
    }
  });
  // const InnerButton = useMemo(() => {} , [type, Icon])
  
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
const ExportedButton = React.memo(Button);
ExportedButton.displayName = 'Button'
export default ExportedButton;
