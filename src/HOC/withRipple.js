import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  rippleConstants,
  transitionFunctions,
} from 'config/animationConstants';
import themes, { DARK_THEME } from 'utils/themes';

const { SMALL_RIPPLE_DURATION, MEDIUM_RIPPLE_DURATION, LARGE_RIPPLE_DURATION } = rippleConstants;
const withRipple = Component => React.forwardRef((
  {
    denseRipple = false,
    rippleColor = 'contrast',
    rippleSize = 'm',
    tag = 'div',
    focusable = false,
    autoFocus = false,
    hocProps,
    style,
    ...props
  }, ref) => {

  const rippleRef = useRef();
  const timeWhenMouseDown = useRef();
  const timeout = useRef();

  useEffect(() => () => clearTimeout(timeout.current), []);

  // x and y are click coordinates, rippleStart and rippleStop are for different animation classes
  // first render is to prevent animation on first render
  const [rippleData, setRippleData] = useState({
    x: 0,
    y: 0,
    rippleStart: false,
    rippleStop: true,
    firstRender: true,
    scale: 0,
  });
  
  useEffect(() => () => clearTimeout(timeout.current))
  useEffect(() => {
    // For some reason its not working automatically
    if (autoFocus)
      rippleRef.current.focus();
  }, [autoFocus])

  useEffect(() => {
    if (rippleData.rippleStop) {
      clearTimeout(timeout.current);
    }
  }, [rippleData.rippleStop]);

  function endRipple() {
    setRippleData({ ...rippleData, rippleStart: false, rippleStop: true });
  }

  function handleMouseDown(e) {
    // Ripple in progress, ignore
    if (rippleData.rippleStart)
      return;

    // noinspection JSValidateTypes
    timeWhenMouseDown.current = Date.now();
    const { clientX, clientY } = e;
    const { current: rippleContainer } = rippleRef;
    const { left, top, width, height } = rippleContainer.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;

    const scaleX = Math.max(width - x, x);
    const scaleY = Math.max(height - y, y);
    const scale = Math.max(scaleX, scaleY);
    // TODO: Remove scaleX and scaleY
    setRippleData(
      {
        x,
        y,
        rippleStart: true,
        rippleStop: false,
        scale,
        firstRender: false,
      });
  }

  function handleMouseUp(e) {
    const timeSinceMouseDown = Date.now() - timeWhenMouseDown.current;
    const timeUntilEndOfAnimation = getRippleDuration(rippleSize) -
      timeSinceMouseDown;

    clearTimeout(timeout.current);
    // If its 0 or negative it will be executed immediately
    // noinspection JSValidateTypes
    timeout.current = setTimeout(endRipple, timeUntilEndOfAnimation);
  }

  const rippleProps = {
    rippleData: rippleData,
    denseRipple: denseRipple,
    size: rippleSize,
    rippleColor,
  };


  const containerProps = {
    ...hocProps,
    rippleColor,
    style,
    as: tag,
    ref: rippleRef,
    tabIndex: focusable ? -1 : null,
    onMouseDownCapture: handleMouseDown,
    onMouseUpCapture: handleMouseUp,
    onMouseOutCapture: endRipple,
  };
  
  return (
    <RippleContainer
      {...containerProps}
    >
      <Ripple {...rippleProps} />
      <Component
        ref={ref}
        {...props}
      />
    </RippleContainer>
  );
});

const availableColors = Object.keys(themes[DARK_THEME]);
withRipple.propTypes = {
  denseRipple: PropTypes.bool, // Is the ripple on surface or on colored surface (less opacity when on surface)
  rippleColor: PropTypes.oneOf(availableColors), // The color of the ripple, default is overlay of the theme
  rippleSize: PropTypes.oneOf(['s', 'm', 'l']), // The size of the component, bigger have longer ripple durations
  hocProps: PropTypes.object, // Props passed directly to the wrapper of the ripple
};

export default withRipple;

const Ripple = styled.div`${props => {
  const { theme, rippleData, denseRipple, rippleColor, size } = props;
  const { x, y, rippleStart, rippleStop, scale, firstRender } = rippleData;

  return `
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    pointer-events: none;
    
    //Ripple
    &:after{
      position: absolute;
      overflow: hidden;
      pointer-events: none;
      content: '';
      width: 0;
      height: 0;
      left: ${x}px;
      top: ${y}px;
      opacity: 0;
      width: 10px;
      height: 10px;
      background: ${theme[rippleColor]};
      
      ${rippleStop && !firstRender && `
        animation: rippleOff ${getRippleDuration(
    size)}ms ${transitionFunctions.deceleratedEasing} forwards!important;
      `};
      
       ${rippleStart && `
          animation: rippleOn ${getRippleDuration(
    size)}ms ${transitionFunctions.acceleratedEasing} forwards!important;
  
        `}
      }
        
        
      @keyframes rippleOn {
        0% {
          will-change: transform, opacity, border-radius;
          opacity: 0.02;
          border-radius: 50%;
          transform: scale(${scale / 15});
        }
        100% {
          will-change: unset;
          opacity: ${denseRipple ? 0.32 : 0.12};
          transform: scale(${scale / 4});
        }
       }

     @keyframes rippleOff {
        0% {
          will-change: transform, opacity;
          opacity: ${denseRipple ? 0.32 : 0.12};
          transform: scale(${scale / 4});  
        }
        50% {
          transform: scale(${scale / 8});
          opacity: 0;
        }
        100% {
          will-change: unset;
          opacity: 0;
        }
      }
  `;
}}`;
const RippleContainer = styled.div`${props => {
  const { theme, rippleColor: hoverFocusColor } = props;
  return `
    position: relative;
    overflow: hidden;
   
    //Hover
    &:before, &:after {
      pointer-events: none;
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      background: ${theme[hoverFocusColor]};
      opacity: 0;
    }
    
    &:hover:before {
      cursor: pointer;
      opacity: 0.04;
    }
    
    // TODO: make sure it doesnt make another layer on already focusable elements     
    &:focus {
      border: none;
      outline: none;
    }
    
    &:focus:after, &:focus-within:after {
      opacity: 0.12;
    }
  `;
}}`;

function getRippleDuration(size) {
  switch (size) {
    case 's' :
      return SMALL_RIPPLE_DURATION;
    case 'm' :
      return MEDIUM_RIPPLE_DURATION;
    case 'l' :
      return LARGE_RIPPLE_DURATION;
    default:
      return SMALL_RIPPLE_DURATION;
  }
}

