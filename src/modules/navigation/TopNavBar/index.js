import React, { createRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_THEME } from 'utils/themes';
import { setBaseTheme, setDarkTheme } from 'reducers/themeReducer';
import { logout } from 'reducers/auth';
import { AuthNav, Logo, Title } from 'modules/navigation';
import DropDown from '../DropDown';
import { ReactComponent as HamIcon } from '../../../assets/icons/menu-24px.svg';
import { StyledTopNav } from './styles';

const TopNavBar = () => {
  const dispatch = useDispatch();
  const navRef = createRef();

  const [ navHeight, setNavHeight ] = useState(0);

  const { themeName } = useSelector(({ themeReducer }) => ({
    themeName: themeReducer.themeName,
  }));

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
      >
        <Logo/>
        <Title/>
        <AuthNav/>
        {/*<button onClick={toggleTheme}>Theme</button>*/}
        {/* <Genres /> */}
      </StyledTopNav>
      <DropDown
        topOffset={navHeight}
        items={[
          { name: 'logout', onClick: logOut, icon: HamIcon },
        ]}
      />
    </>
  );
};

export default TopNavBar;
