import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_THEME } from 'utils/themes';
import { setBaseTheme, setDarkTheme } from 'reducers/themeReducer';
import { AuthNav, Logo, Title } from 'modules/navigation';
import { StyledTopNav } from './styles';

const TopNavBar = () => {
  const dispatch = useDispatch();
  const { themeName } = useSelector(({ themeReducer }) => ({
    themeName: themeReducer.themeName,
  }));

  const toggleTheme = () =>
    themeName === BASE_THEME
      ? dispatch(setDarkTheme)
      : dispatch(setBaseTheme);


  return (
    <StyledTopNav
      className='top-nav'
      elevation={16}
    >
      <Logo/>
      <Title/>
      <AuthNav/>
      <button onClick={toggleTheme}>Theme</button>
      {/* <Genres /> */}
    </StyledTopNav>
  );
};

export default TopNavBar;