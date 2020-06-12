export const BASE_THEME = 'BASE_THEME';
export const DARK_THEME = 'DARK_THEME';


export default {
  [BASE_THEME]: {
    primary: '#009688',
    primaryDark: '#00796B',
    primaryLight: '#80CBC4',
    secondary: '#000000',
    surface: '#EFEEFF',
    neon: '#B2FF59',
    textColor: '#000000DD',
    disabled: '#00000037',
    error: '#B00020',
    accent: '#000f96',
    isDark: false,
  },
  [DARK_THEME]: {
    primary: '#E040FB',
    primaryDark: '#00796B',
    primaryLight: '#80CBC4',
    secondary: '#E040FB',
    surface: '#121212',
    neon: '#00909e',
    textColor: '#FFFFFFDD',
    disabled: '#FFFFFF37',
    error: '#B00020',
    isDark: true,
  }
};
