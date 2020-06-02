import React from 'react';
import { useSelector } from 'react-redux';
import { DARK_THEME } from 'utils/themes';
import { StyledThemedComponent } from './styles';

const ThemedComponent = ({ elevation = 0, className, children, ...rest }) => {
  const { themeColors: theme, themeName } = useSelector(({ themeReducer: { themeColors, themeName } }) => ({
    themeColors,
    themeName,
  }));


  return (
    <StyledThemedComponent
      isDark={themeName === DARK_THEME}
      elevation={elevation}
      className={className}
      {...rest}
    >
      {children}
    </StyledThemedComponent>
  );
};

export default ThemedComponent;