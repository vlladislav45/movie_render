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
    onSurfaceMD: '#666666', // 60% black medium emphasis
    onPrimary: '#def4f7', // TODO: for both 87% black on primary and secondary color
    onSecondary: '#ece4fb', //
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
    surface: '#1f2a2c', // 12% primary on surface (#121212)
    onSurface: '#e2e3e4', // 87% white on surface
    onSurfaceMD: '#a5aaab', // 60% white on surface
    onPrimary: '#000000',
    onSecondary: '#000000',
    disabled: '#747b7c', // 38% white on surface
    error: '#CF6679',
    neon: '#9d71ea', // was #00909e
    isDark: true,
    overlay: '#000000',
    contrast: '#FFFFFF',
  }
};
//#465355
console.log(getOverlay('#ba9bef', '#000000', 0.87, true));
