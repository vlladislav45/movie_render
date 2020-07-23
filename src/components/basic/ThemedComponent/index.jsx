import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import themes, { DARK_THEME } from 'utils/themes';
import { StyledThemedComponent } from './styles';

/**
 * TODO: Maybe rename to MaterialComponent
 * Basic material component handling elevation adn theming
 */
const ThemedComponent = React.forwardRef(
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
      <StyledThemedComponent
        ref={ref}
        elevation={elevation}
        shouldElevateWhenHover={shouldElevateWhenHover}
        size={size}
        {...rest}
      >
        {children}
      </StyledThemedComponent>
    );
  });

ThemedComponent.propTypes = {
  elevation: PropTypes.number,
  shouldElevateWhenHover: PropTypes.bool,
  size: PropTypes.oneOf(['s', 'm', 'l']),
};

export default ThemedComponent;
