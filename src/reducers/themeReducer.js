import themes, { BASE_THEME, DARK_THEME } from 'utils/themes';

const CHANGE_THEME = 'CHANGE_THEME';

export const setDarkTheme = {
  type: CHANGE_THEME,
  payload: DARK_THEME,
};

export const setBaseTheme = {
  type: CHANGE_THEME,
  payload: BASE_THEME,
};

const initialState = {
  themeName: BASE_THEME,
  themeColors: { ...themes[BASE_THEME] },
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch ( type ) {
    case CHANGE_THEME:
      document.body.style.background = themes[payload].surface;
      return {
        ...state,
        themeName: payload,
        themeColors: { ...themes[payload] },
      };
    default:
      return state;
  }
}
