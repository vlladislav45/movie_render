import React from 'react';
import { useSelector } from 'react-redux';
import { DARK_THEME } from 'utils/themes';
import { StyledThemedComponent } from './styles';

const ThemedComponent = React.forwardRef(({ elevation = 0, className, children, ...rest }, ref) => {
  const { themeColors: theme, themeName } = useSelector(({ themeReducer: { themeColors, themeName } }) => ({
    themeColors,
    themeName,
  }));


  return (
    <StyledThemedComponent
      ref={ref}
      isDark={themeName === DARK_THEME}
      elevation={elevation}
      className={className}
      {...rest}
    >
      {children}
    </StyledThemedComponent>
  );
});

export default ThemedComponent;