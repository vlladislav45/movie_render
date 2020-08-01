import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { closeNavigationDrawer } from 'reducers/uiReducer';
import useDeviceDimensions from 'hooks/useDeviceDimensions';
import DrawerHeader from './DrawerHeader';
import DrawerMenu from './DrawerMenu';
import { Drawer, DrawerDivider, Overlay } from './styles';

const NavigationDrawer = props => {
  const dispatch = useDispatch();
  const drawerRef = useRef();
  
  const { drawerOpen } = useSelector(({ uiReducer }) => ({
    drawerOpen: uiReducer.drawerOpen,
  }))
  const { device, width } = useDeviceDimensions();
  
  //Close drawer on swipe left https://stackoverflow.com/a/23230280
  // TODO: Make it on scroll left also
  // TODO: Make it slide a little bit and close after a certain threshold is reached
  useEffect(() => {
    if (!drawerOpen || !drawerRef.current) return;
    
    drawerRef.current.addEventListener('touchstart', handleTouchStart, false)
    drawerRef.current.addEventListener('touchmove', handleTouchMove, false)
    
    let xDown = null;
    
    function handleTouchStart(evt) {
      if (!evt.touches) return;
      const firstTouch = evt.touches[0];
      xDown = firstTouch.clientX;
    }
    
    function handleTouchMove(evt) {
      if (!xDown || !evt.touches) {
        return;
      }
      
      let xUp = evt.touches[0].clientX;
      let xDiff = xDown - xUp;
      
      if (xDiff > 0) {
        /* left swipe or scroll */
        dispatch(closeNavigationDrawer())
      }
      /* reset values */
      xDown = null;
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

NavigationDrawer.propTypes = {};

export default NavigationDrawer;