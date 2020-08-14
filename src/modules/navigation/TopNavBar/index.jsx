import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleNavigationDrawer } from 'reducers/uiReducer';
import { Loading, Logo } from 'components';
import useDeviceDimensions from 'hooks/useDeviceDimensions';
import {
  NavBarLogo,
  StyledTopNav,
  TopNavExpand,
  TopNavGenres,
  TopNavInner,
  TopNavMenu,
  TopNavRow,
  TopNavSearch,
  TopNavTitle
} from './styles';

const NAVBAR_EXTENDED_STATE = 'NAVBAR_EXTENDED_STATE';
const TopNavBar = () => {
  const dispatch = useDispatch();
  const { device } = useDeviceDimensions();
  
  const [isExpanded, setIsExpanded] = useState(JSON.parse(localStorage.getItem(NAVBAR_EXTENDED_STATE)));
  const [isLoading, setIsLoading] = useState(!device);
  
  function toggleExtendedNavbar() {
    setIsExpanded(isExpanded => !isExpanded);
    localStorage.setItem(NAVBAR_EXTENDED_STATE, JSON.stringify(!isExpanded));
  }
  
  function toggleDrawer() {
    dispatch(toggleNavigationDrawer())
  }
  
  function stopLoading() {
    setIsLoading(false)
  }
  
  return (
    <StyledTopNav
      displayName='TapAppBar'
      id='top-nav'
      device={device}
      isExtended={isExpanded}
    >
      <Loading onlyCogWheel isLoading={isLoading}/>
      {!!device && (
        <TopNavInner>
          <TopNavRow>
            <TopNavMenu
              className='navbar-action'
              onClick={toggleDrawer}
            />
            <NavBarLogo textColor='transparent'/>
            {/*<TopNavTitle $deviceWidth={width}/>*/}
            <TopNavSearch/>
            <TopNavExpand
              onClick={toggleExtendedNavbar}
              className='navbar-action'
              $isExpanded={isExpanded}
            />
          </TopNavRow>
          <TopNavRow>
            <TopNavGenres onFinishLoading={stopLoading}/>
          </TopNavRow>
        </TopNavInner>
      )
      }
    </StyledTopNav>
  );
};

export default TopNavBar;
