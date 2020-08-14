import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeNavigationDrawer } from 'reducers/uiReducer';
import useDeviceDimensions from 'hooks/useDeviceDimensions';
import DrawerHeader from './DrawerHeader';
import DrawerMenu from './DrawerMenu';
import { Drawer, DrawerDivider, Overlay } from './styles';

const NavigationDrawer = () => {
  const dispatch = useDispatch();
  const drawerRef = useRef();
  
  const { drawerOpen } = useSelector(({ uiReducer }) => ({
    drawerOpen: uiReducer.drawerOpen,
  }))
  const { device, width } = useDeviceDimensions();
  const [drawerTranslate, setDrawerTranslate] = useState(0);
  
  const CLOSE_THRESHOLD = useMemo(
    () => drawerRef.current ? drawerRef.current.offsetWidth / 2 : 150,
    [drawerRef, width]);
  
  useEffect(() => {
    if (drawerTranslate > CLOSE_THRESHOLD)
      dispatch(closeNavigationDrawer());
  }, [drawerTranslate])
  
  // Close drawer on swipe left https://stackoverflow.com/a/23230280
  useEffect(() => {
    if (!drawerOpen || !drawerRef.current) return;
    setDrawerTranslate(0);
    drawerRef.current.addEventListener('touchstart', handleTouchStart, false);
    drawerRef.current.addEventListener('touchmove', handleTouchMove, false);
    drawerRef.current.addEventListener('touchend', handleTouchEnd, false);
    
    let xLeft = null;
    
    function handleTouchStart(evt) {
      if (!evt.touches) return;
      const firstTouch = evt.touches[0];
      xLeft = firstTouch.clientX;
    }
    
    function handleTouchMove(evt) {
      if (!xLeft || !evt.touches) {
        return;
      }
      
      let xRight = evt.touches[0].clientX;
      let xDiff = xLeft - xRight;
      
      setDrawerTranslate(xDiff);
    }
    
    function handleTouchEnd(e) {
      setDrawerTranslate(translate => translate < CLOSE_THRESHOLD ? 0 : translate);
    }
  }, [drawerOpen])
  
  function handleClick(e) {
    if (e.target.closest('#navigation-drawer') === null) {
      dispatch(closeNavigationDrawer())
    }
  }
  
  return (
    <Overlay
      onClick={handleClick}
      isOpen={drawerOpen}
    >
      <Drawer
        ref={drawerRef}
        $translate={drawerTranslate}
        responsive={{
          device, width
        }}
        isOpen={drawerOpen}
        id='navigation-drawer'
        elevation={16}
      >
        <DrawerHeader/>
        <DrawerDivider/>
        <DrawerMenu/>
      </Drawer>
    </Overlay>
  );
};

export default NavigationDrawer;