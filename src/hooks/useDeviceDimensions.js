import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';


const selector = createSelector(
  shop => shop.uiReducer.windowDimensions,
  ({ width, height, device, isMobileOrTablet }) => ({
    width,
    height,
    device,
    isMobileOrTablet,
    vmin: Math.min(width, height),
    vmax: Math.max(width, height)
  })
)
/**
 * Custom hook to get device dimensions and device type
 */
const useDeviceDimensions = () => useSelector(selector);

export default useDeviceDimensions;
