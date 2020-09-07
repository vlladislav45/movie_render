import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { toggleNavigationDrawer } from 'reducers/uiReducer';
import { Loading } from 'components';
import {
  LogoContainer,
  NavBarLogo,
  StyledTopNav,
  TopNavExpand,
  TopNavGenres,
  TopNavInner,
  TopNavMenu,
  TopNavRow,
  TopNavSearch
} from './styles';

const NAVBAR_EXTENDED_STATE = 'NAVBAR_EXTENDED_STATE';
const TopNavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isExpanded, setIsExpanded] = useState(JSON.parse(localStorage.getItem(NAVBAR_EXTENDED_STATE)));
  const [isLoading, setIsLoading] = useState(true);

  const toggleExtendedNavbar = useCallback(() => {
    setIsExpanded(isExpanded => !isExpanded);
    localStorage.setItem(NAVBAR_EXTENDED_STATE, JSON.stringify(!isExpanded));
  }, [])

  const toggleDrawer = useCallback(() => {
    dispatch(toggleNavigationDrawer())
  }, [dispatch])

  const stopLoading = useCallback(() => {
    setIsLoading(false)
  }, [])

  const openMainPage = useCallback(() => {
    if (history.location.pathname !== '/')
      history.push('/')
  }, [history])
  
  return (
    <>
      <Loading onlyCogWheel isLoading={isLoading}/>
      <StyledTopNav
        displayName='TapAppBar'
        id='top-nav'
        isExtended={isExpanded}
      >
          <TopNavInner>
            <TopNavRow>
              <TopNavMenu
                className='navbar-action'
                onClick={toggleDrawer}
              />
              <LogoContainer>
                <NavBarLogo onClick={openMainPage} textColor='transparent'/>
              </LogoContainer>
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
      </StyledTopNav>
    </>
  );
};

export default React.memo(TopNavBar);
