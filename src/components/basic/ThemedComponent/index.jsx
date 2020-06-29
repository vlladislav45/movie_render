import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import themes, { DARK_THEME } from 'utils/themes';
import { StyledThemedComponent } from './styles';
import { createRipple } from './ripple';

/**
 * TODO: Maybe rename to MaterialComponent
 * Basic material component handling ripple, elevation adn theming
 */
const RIPPLE_DURATION = 200;
let time, timeout;
const ThemedComponent = React.forwardRef(
  (
    { elevation = 0, className, children, ...moreProps },
    ref) => {
    // Options for the component
    const {
      shouldElevateWhenHover, withRipple,
      rippleColor, size = 'm',
      ...rest
    } = moreProps;

    const { themeName, themeColors } = useSelector(
      ({ themeReducer: { themeName, themeColors } }) => ({
        themeName,
        themeColors,
      }));

    const [ripple, setRipple] = useState(false);
    const [rippleCoordinates, setRippleCoordinates] = useState({});

    useEffect(() => () => {
      setRipple(false);
      clearTimeout(timeout);
    }, []);

    function deactivateRipple () {
      if (!withRipple) return;
      const timeLeft = Date.now() - time;
      // Workaround to ensure ripple animation will end
      if (timeLeft > 0 && timeLeft < RIPPLE_DURATION)
        timeout = setTimeout(() => {
          setRipple(false);
        }, RIPPLE_DURATION - timeLeft);
      else {
        setRipple(false);
      }
    }

    function activateRipple (e) {
      if (!withRipple) return;
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;
      // noinspection JSCheckFunctionSignatures
      setRippleCoordinates({ x, y });
      setRipple(true);
      // TODO: This should be in useEffect if not constant values are observed
      time = Date.now();
    }

    return (
      <StyledThemedComponent
        ref={ref}
        elevation={elevation}
        className={className}
        shouldElevateWhenHover={shouldElevateWhenHover}
        onMouseDown={activateRipple}
        onMouseUp={deactivateRipple}
        onMouseLeave={deactivateRipple}
        size={size}
        rippleActive={ripple}
        rippleColor={rippleColor}
        coordinates={rippleCoordinates}
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
  size: PropTypes.oneOf(['s', 'm', 'l']),
};

export default ThemedComponent;
