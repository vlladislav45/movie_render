import React, { useState } from 'react';
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


const TopNavBar = () => {
  const dispatch = useDispatch();
  const { device, width } = useDeviceDimensions();
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  
  // TODO: Do i need this functionality?
  // When scrolled top bar can be hidden or shrunk
  // function handleScroll() {
  //   let lastScroll = 0;
  //
  //   return () => {
  //     const scroll = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
  //     if (scroll > lastScroll) {
  //       setIsScrolled(true)
  //     } else {
  //       setIsScrolled(false)
  //     }
  //     lastScroll = scroll <= 0 ? 0 : scroll; // For Mobile or negative scrolling
  //   }
  // }
  //
  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll());
  //   return () => window.removeEventListener('scroll', handleScroll());
  // }, [])
  //
  function toggleDrawer() {
    dispatch(toggleNavigationDrawer())
  }
  
  return (
    <StyledTopNav
      displayName='TapAppBar'
      id='top-nav'
      device={device}
      isExtended={isExpanded}
      isScrolled={isScrolled}
    >
      {!!device
        ? (
          <TopNavInner>
            <TopNavRow>
              <TopNavMenu onClick={toggleDrawer}/>
              <TopNavTitle $deviceWidth={width}/>
              <TopNavSearch/>
              <TopNavExpand
                onClick={() => setIsExpanded(isExtended => !isExtended)}
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
