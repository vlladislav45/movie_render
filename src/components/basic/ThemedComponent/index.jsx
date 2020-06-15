import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import themes, { DARK_THEME } from 'utils/themes';
import { StyledThemedComponent } from './styles';
import { createRipple } from './ripple';

/**
 * TODO: Maybe rename to MaterialComponent
 * Basic material component handling ripple, elevation adn themeing
 */
const ThemedComponent = React.forwardRef(
  (
    { elevation = 0, className, children, ...moreProps },
    ref) => {
    // Options for the component
    const {
      shouldElevateWhenHover, withRipple,
      rippleColor, size = 'm',
      onClick, ...rest
    } = moreProps;

    const { themeName, themeColors } = useSelector(
      ({ themeReducer: { themeName, themeColors } }) => ({
        themeName,
        themeColors,
      }));

    let classes = className + ' material-component';
    if (withRipple) classes += ' ripple';

    function ripple (e) {
      createRipple(e, themeName === DARK_THEME, themeColors[rippleColor]);
      onClick && onClick(e);
      e.stopPropagation();
    }

    return (
      <StyledThemedComponent
        ref={ref}
        elevation={elevation}
        onClick={ripple}
        shouldElevateWhenHover={shouldElevateWhenHover}
        className={classes}
        size={size}
        {...rest}
      >
        {children}
      </StyledThemedComponent>
    );
  });

const availableColors = Object.keys(themes[DARK_THEME]);

ThemedComponent.propTypes = {
  elevation: PropTypes.number,
  shouldElevateWhenHover: PropTypes.bool,
  withRipple: PropTypes.bool,
  rippleColor: PropTypes.oneOf(availableColors),
  size: PropTypes.oneOf([ 's', 'm', 'l' ])
};

export default ThemedComponent;
