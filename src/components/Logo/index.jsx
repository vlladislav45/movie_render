import React from 'react';
import PropTypes from 'prop-types';
import themes from 'utils/themes';
import { StyledLogo } from './styles';

const Logo = ({ robotColor, textColor, ...props }) => (
  <StyledLogo
    $robotColor={robotColor}
    $textColor={textColor}
    {...props}
  />
);

Logo.propTypes = {
  robotColor: PropTypes.oneOf(Object.keys(themes['BASE_THEME'])),
  textColor: PropTypes.oneOf(Object.keys(themes['BASE_THEME'])),
}

Logo.defaultProps = {}

export default React.memo(Logo);