import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeNavigationDrawer } from 'reducers/uiReducer';
import useDeviceDimensions from 'hooks/useDeviceDimensions';
import DrawerHeader from './DrawerHeader';
import DrawerMenu from './DrawerMenu';
import { Drawer, DrawerDivider, Overlay } from './styles';
import { createSelector } from 'reselect';

const selector = createSelector(
  store => store.uiReducer.drawerOpen,
  drawerOpen => ({
    drawerOpen,
  }))
const NavigationDrawer = () => {
  const dispatch = useDispatch();
  const drawerRef = useRef();
  
  const { drawerOpen } = useSelector(selector)
  const { device, width, isMobileOrTablet } = useDeviceDimensions('Drawer');
  
  const [isDragging, setIsDragging] = useState(false);
  
  const CLOSE_THRESHOLD = useMemo(
    () => drawerRef.current ? drawerRef.current.offsetWidth / 2 : 150,
    [drawerRef, width]);
  
  // Close drawer on swipe left https://stackoverflow.com/a/23230280
  useEffect(() => {
    if (!drawerOpen || !drawerRef.current || !isMobileOrTablet) return;
    const { current: drawer } = drawerRef;
    
    drawer.addEventListener('touchstart', handleTouchStart, false);
    drawer.addEventListener('touchmove', handleTouchMove, false);
    drawer.addEventListener('touchend', handleTouchEnd, false);
    
    let xLeft = null;
    let prevXDiff = 0;
    
    function handleTouchStart(evt) {
      if (!evt.touches) return;
      const firstTouch = evt.touches[0];
      xLeft = firstTouch.clientX;
      prevXDiff = 0;
      setIsDragging(true);
    }
    
    
    function handleTouchMove(evt) {
      if (!xLeft || !evt.touches) {
        return;
      }
      
      let xRight = evt.touches[0].clientX;
      let xDiff = xLeft - xRight;
      prevXDiff = xDiff;
      
      if (xDiff >= CLOSE_THRESHOLD) {
        setIsDragging(false);
        drawer.removeEventListener('touchmove', handleTouchMove, false);
        handleTouchEnd(evt);
      } else {
        drawer.style.transform = 'translateX(' + Math.min((-xDiff), 0) + 'px)';
      }
    }
    
    function handleTouchEnd() {
      setIsDragging(false);
      if (prevXDiff >= CLOSE_THRESHOLD)
        dispatch(closeNavigationDrawer());
      drawer.style.transform = '';
    }
    
    return () => {
      drawer.removeEventListener('touchstart', handleTouchStart, false);
      drawer.removeEventListener('touchmove', handleTouchMove, false);
      drawer.removeEventListener('touchend', handleTouchEnd, false);
    }
  }, [drawerOpen, isMobileOrTablet])
  
  function handleClick(e) {
    if (e.target.closest('#navigation-drawer') === null) {
      dispatch(closeNavigationDrawer())
    }
  }
  
  if (!device || !width) return null;
 
  return (
    <Overlay
      onClick={handleClick}
      isOpen={drawerOpen}
      displayName='DrawerOverlay'
    >
      <Drawer
        ref={drawerRef}
        $isDragging={isDragging}
        $width={width}
        $device={device}
        isOpen={drawerOpen}
        id='navigation-drawer'
        elevation={16}
        displayName='DrawerContent'
      >
        <DrawerHeader/>
        <DrawerDivider/>
        <DrawerMenu/>
      </Drawer>
    </Overlay>
  );
};

export default NavigationDrawer;