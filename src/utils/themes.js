export const BASE_THEME = 'BASE_THEME';
export const DARK_THEME = 'DARK_THEME';


export default {
  [BASE_THEME]: {
    primary: '#dc8e8e',
    primaryDark: '#00796B',
    primaryLight: '#80CBC4',
    secondary: '#000000',
    surface: '#EFEEFF',
    neon: '#8edcdc',
    textColor: '#000000DD',
    disabled: '#00000037',
    error: '#B00020',
    accent: '#6200ee',
    isDark: false,
  },
  [DARK_THEME]: {
    primary: '#BB86FC',
    primaryDark: '#3700B3',
    primaryLight: '#80CBC4',
    secondary: '#03DAC6',
    surface: '#121212',
    neon: '#E040FB', // was #00909e
    textColor: '#FFFFFFDD',
    disabled: '#FFFFFF67',
    error: '#CF6679',
    accent: '#BB86FC',
    isDark: true,
  }
};
