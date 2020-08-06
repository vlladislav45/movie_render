import { getOverlay } from './colorUtils';

export const BASE_THEME = 'BASE_THEME';
export const DARK_THEME = 'DARK_THEME';

// Primary is little changed cyan 600
// Primary from dark theme is cyan 200
// Secondary is the triadic of primary
// Secondary for dark theme is the 200 version
export default {
  [BASE_THEME]: {
    primary: '#00ACC1', // was #dc8e8e
    primaryDark: '#00838F',
    secondary: '#6d2cdf',
    surface: '#e0f5f8', // WHITE with 12% PRIMARY
    onSurface: '#1d2020', //87% black on surface
    onSurfaceMD: '#666666', // 60% black on surface medium emphasis
    onPrimary: '#001619',
    onSecondary: '#ece4fb',
    disabled: '#9F9F9F', // 38% black
    error: '#B00020',
    neon: '#8edcdc',
    isDark: false,
    overlay: '#FFFFFF',
    contrast: '#000000',
  },
  [DARK_THEME]: {
    primary: '#80ddea', // was #BB86FC
    primaryDark: '#00838F',
    secondary: '#ba9bef',
    //This is #121212 with 12% base theme primary color
    //Prev value (#121212 with 12% dark theme primary color is #1f2a2c)
    surface: '#102427', // 12% primary on surface (#121212)
    onSurface: '#e2e3e4', // 87% white on surface
    onSurfaceMD: '#a5aaab', // 60% white on surface
    onPrimary: '#111d1e',
    onSecondary: '#18141f',
    disabled: '#747b7c', // 38% white on surface
    error: '#CF6679',
    neon: '#9d71ea', // was #00909e
    isDark: true,
    overlay: '#121212', // was black
    contrast: '#FFFFFF',
  }
};
//#465355
console.log(getOverlay('#ba9bef', '#000000', 0.87, true));
