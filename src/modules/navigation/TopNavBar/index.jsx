import React, { createRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBaseTheme, setDarkTheme } from 'reducers/themeReducer';
import { logout } from 'reducers/auth';
import { AuthNav, Logo, Title, SearchBar, DropDown } from 'modules/navigation';
import { Genres } from 'components';
import { BASE_THEME, DARK_THEME } from 'utils/themes';
import browserHistory from 'utils/browserHistory';
import { ReactComponent as PaletteIcon } from 'assets/icons/palette-24px.svg';
import { ReactComponent as LogoutIcon } from 'assets/icons/logout-24px.svg';
import { ReactComponent as ProfileIcon } from 'assets/icons/profile-24px.svg';

import { StyledTopNav } from './styles';


const TopNavBar = () => {
  const dispatch = useDispatch();
  const navRef = createRef();

  const [ navHeight, setNavHeight ] = useState(0);

  const { themeName } = useSelector(({ themeReducer }) => ({
    themeName: themeReducer.themeName,
  }));
  const isDark = themeName === DARK_THEME;

  useEffect(() => {
    if ( navRef.current ) {
      const { height } = navRef.current.getBoundingClientRect();
      setNavHeight(height);
    }
  }, [ navRef ]);

  const toggleTheme = () =>
    themeName === BASE_THEME
      ? dispatch(setDarkTheme)
      : dispatch(setBaseTheme);

  const logOut = () => dispatch(logout());

  return (
    <>
      <StyledTopNav
        ref={navRef}
        className='top-nav'
        elevation={16}
        isDark={isDark}
      >
        <Logo/>
        <Title/>
        <AuthNav/>
        <Genres />
        <SearchBar />
      </StyledTopNav>
      <DropDown
        topOffset={navHeight}
        items={[
          { name: isDark? 'Base theme' : 'Dark theme', onClick: toggleTheme, icon: PaletteIcon },
          { name: 'profile', onClick: () => browserHistory.push('profile'), icon: ProfileIcon },
          { name: 'logout', onClick: logOut, icon: LogoutIcon },
        ]}
      />
    </>
  );
};

export default TopNavBar;
