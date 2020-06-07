import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { DARK_THEME } from 'utils/themes';
import { StyledThemedComponent } from './styles';

const ThemedComponent = React.forwardRef(({ elevation = 0, className, children, ...moreProps }, ref) => {
  const { shouldElevateWhenHover, ...rest } = moreProps;
  const { themeName } = useSelector(({ themeReducer: { themeName } }) => ({
    themeName,
  }));


  return (
    <StyledThemedComponent
      ref={ref}
      isDark={themeName === DARK_THEME}
      elevation={elevation}
      shouldElevateWhenHover={shouldElevateWhenHover}
      className={className}
      {...rest}
    >
      {children}
    </StyledThemedComponent>
  );
});

ThemedComponent.propTypes = {
  elevation: PropTypes.number,
  shouldElevateWhenHover: PropTypes.bool,
}

export default ThemedComponent;