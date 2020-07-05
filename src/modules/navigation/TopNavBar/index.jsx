import React, { createRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBaseTheme, setDarkTheme } from 'reducers/themeReducer';
import { logout } from 'reducers/auth';
import { AuthNav, DropDown, Logo, SearchBar, Title } from 'modules/navigation';
import { Genres } from 'components';
import { BASE_THEME, DARK_THEME } from 'utils/themes';
import useDeviceDimensions from 'hooks/useDeviceDimensions';
import browserHistory from 'utils/browserHistory';
import { ReactComponent as PaletteIcon } from 'assets/icons/palette-24px.svg';
import { ReactComponent as LogoutIcon } from 'assets/icons/logout-24px.svg';
import { ReactComponent as ProfileIcon } from 'assets/icons/profile-24px.svg';
import { StyledTopNav } from './styles';


const TopNavBar = () => {
  const dispatch = useDispatch();
  const navRef = createRef();
  const { device } = useDeviceDimensions();

  const [navHeight, setNavHeight] = useState(0);

  const { themeName } = useSelector(({ themeReducer }) => ({
    themeName: themeReducer.themeName,
  }));
  const isDark = themeName === DARK_THEME;

  useEffect(() => {
    if (navRef.current) {
      const { height } = navRef.current.getBoundingClientRect();
      setNavHeight(height);
    }
  }, [navRef]);

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
        device={device}
        elevation={8} //Original is 16
        size='l'
      >
        <Logo id='logo'/>
        <Title id='title'/>
        <AuthNav id='auth-nav'/>
        <SearchBar id='search-bar'/>
        <Genres id='genres'/>
      </StyledTopNav>
      <DropDown
        topOffset={navHeight}
        items={[
          { name: isDark ? 'Base theme' : 'Dark theme', onClick: toggleTheme, icon: PaletteIcon },
          { name: 'profile', onClick: () => browserHistory.push('/profile'), icon: ProfileIcon },
          { name: 'logout', onClick: logOut, icon: LogoutIcon },
        ]}
      />
    </>
  );
};

export default TopNavBar;
