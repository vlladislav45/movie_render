import React, { useEffect } from 'react';
import { uniqueId } from 'lodash';
import PropTypes from 'prop-types';
import { addRipple } from 'utils/rippleUtils';
import { ButtonWrapper } from './styles';


interface ButtonProps {
  type?: string,
  text?: string,
  color?: string,
  disabled?: boolean,
  Icon?: React.ComponentClass,
  [x: string]: any,
}

const ContainedButton = React.lazy(() => import('./Contained'));
const TextButton = React.lazy(() => import('./Text'));

const Button = React.forwardRef((props: ButtonProps, ref) => {
  const {
    type = 'contained', color = 'primary', disabled = false,
    Icon, text, ...moreProps
  } = props;
  const { children, onClick, ...rest } = moreProps;
  const btnId = React.useMemo(() => `btn_${uniqueId()}`, []);

  useEffect(() => {
    const el = document.getElementById(btnId);
    if (el)
      addRipple(el);
  }, [btnId]);


  const buttonProps = React.useMemo(() => (text || children) ? ({
    id: btnId,
    onClickCapture: onClick,
    disabled: disabled,
    color: color,
    withIcon: !!Icon,
    Icon,
    text: text || children,
    as: 'button',
  }) : null, [btnId, text, disabled, onClick, color, Icon])

  if (!buttonProps) return null;

  return (
    <ButtonWrapper ref={ref} {...rest}>
      <React.Suspense fallback={<></>}>
        {type === 'contained' &&
          <ContainedButton {...buttonProps}
        />}
        {type === 'text' &&
          <TextButton {...buttonProps}
        />}
      </React.Suspense>
    </ButtonWrapper>
  );
});

Button.propTypes = {
  type: PropTypes.oneOf(['contained', 'text']),
  color: PropTypes.oneOf(['primary', 'secondary', 'surface']), //NOTE: surface should be used for dark theme only
  disabled: PropTypes.bool,
  text: PropTypes.string,
  Icon: PropTypes.elementType,
};

export default Button;