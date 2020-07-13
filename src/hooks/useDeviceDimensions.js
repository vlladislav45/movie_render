import { useSelector } from 'react-redux';

/**
 * Custom hook to get device dimensions and device type
 */
const useDeviceDimensions = () => {
  return useSelector(({ uiReducer: { windowDimensions: { width, height, device } }}) => ({
    width,
    height,
    device,
    vmin: Math.min(width, height),
    vmax: Math.max(width, height)
  }));
};

export default useDeviceDimensions;
