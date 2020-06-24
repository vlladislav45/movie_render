import { useSelector } from 'react-redux';

/**
 * Custom hook to get device dimensions and device type
 */
const useDeviceDimensions = () => {
  return useSelector(({ uiReducer: { windowDimensions: { width, height, device } }}) => ({
    width,
    height,
    device,
  }));
};

export default useDeviceDimensions;
