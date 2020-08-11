import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleNavigationDrawer } from 'reducers/uiReducer';
import { Loading } from 'components';
import useDeviceDimensions from 'hooks/useDeviceDimensions';
import {
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
  const { device, width } = useDeviceDimensions();
  
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    setIsExpanded(JSON.parse(localStorage.getItem(NAVBAR_EXTENDED_STATE)));
  }, [])
  
  function toggleExtendedNavbar() {
    setIsExpanded(isExpanded => !isExpanded);
    localStorage.setItem(NAVBAR_EXTENDED_STATE, JSON.stringify(!isExpanded));
  }
  
  function toggleDrawer() {
    dispatch(toggleNavigationDrawer())
  }
  
  return (
    <StyledTopNav
      displayName='TapAppBar'
      id='top-nav'
      device={device}
      isExtended={isExpanded}
    >
      {!!device
        ? (
          <TopNavInner>
            <TopNavRow>
              <TopNavMenu
                className='navbar-action'
                onClick={toggleDrawer}
              />
              <TopNavTitle $deviceWidth={width}/>
              <TopNavSearch/>
              <TopNavExpand
                onClick={toggleExtendedNavbar}
                className='navbar-action'
                $isExpanded={isExpanded}
              />
            </TopNavRow>
            <TopNavRow>
              <TopNavGenres/>
            </TopNavRow>
          </TopNavInner>
        )
        : <Loading/>
      }
    </StyledTopNav>
  );
};

export default TopNavBar;
