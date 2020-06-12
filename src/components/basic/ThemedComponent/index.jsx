import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { DARK_THEME } from 'utils/themes';
import { StyledThemedComponent } from './styles';
import { createRipple } from './ripple';

const ThemedComponent = React.forwardRef(
  ({ elevation = 0, className, children, ...moreProps },
   ref) => {
    const { shouldElevateWhenHover, withRipple, ...rest } = moreProps;
    const { themeName } = useSelector(({ themeReducer: { themeName } }) => ({
      themeName,
    }));

    let classes = className + ' material-component';
    if (withRipple) classes += ' ripple';

    function ripple(e) {
      createRipple(e, themeName === DARK_THEME)
    }

    return (
      <StyledThemedComponent
        ref={ref}
        isDark={themeName === DARK_THEME}
        elevation={elevation}
        onClick={ripple}
        shouldElevateWhenHover={shouldElevateWhenHover}
        className={classes}
        {...rest}
      >
        {children}
      </StyledThemedComponent>
    );
  });

ThemedComponent.propTypes = {
  elevation: PropTypes.number,
  shouldElevateWhenHover: PropTypes.bool,
  withRipple: PropTypes.bool,
};

export default ThemedComponent;