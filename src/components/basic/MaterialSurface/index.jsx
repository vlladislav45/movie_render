import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import themes, { DARK_THEME } from 'utils/themes';
import { StyledMaterialSurface } from './styles';

/**
 * Basic material component handling elevation adn theming
 */
const MaterialSurface = React.forwardRef(
  (
    props,
    ref) => {

    // Options for the component
    const {
      shouldElevateWhenHover,
      size = 'm',
      elevation = 0,
      children,
      ...rest
    } = props;

    return (
      <StyledMaterialSurface
        ref={ref}
        elevation={elevation}
        shouldElevateWhenHover={shouldElevateWhenHover}
        size={size}
        {...rest}
      >
        {children}
      </StyledMaterialSurface>
    );
  });

MaterialSurface.propTypes = {
  elevation: PropTypes.number,
  shouldElevateWhenHover: PropTypes.bool,
  size: PropTypes.oneOf(['s', 'm', 'l']),
};

export default MaterialSurface;
