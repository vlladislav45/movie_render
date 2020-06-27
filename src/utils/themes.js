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
    surface: '#FFFFFF',
    onSurface: '#222222', //87% black
    onSurfaceMD: '#666666', // 60% black medium emphasis
    onPrimary: '#DDF4F7', // TODO: for both 87% black on primary and secondary color
    onSecondary: '#DDF4F7', //
    disabled: '#9F9F9F', // 38% black
    error: '#B00020',
    neon: '#8edcdc',
    isDark: false,
    overlay: '#FFFFFF',
  },
  [DARK_THEME]: {
    primary: '#80ddea', // was #BB86FC
    primaryDark: '#00838F',
    secondary: '#ba9bef',
    surface: '#121212',
    onSurface: '#DDDDDD', // 87% white
    onSurfaceMD: '#999999', // 60% white medium emphasis
    onPrimary: '#00000084',
    onSecondary: '#00000084',
    disabled: '#606060', // 38% white
    error: '#CF6679',
    neon: '#9d71ea', // was #00909e
    isDark: true,
    overlay: '#000000',
  }
};
