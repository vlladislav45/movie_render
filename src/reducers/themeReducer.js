import themes, { BASE_THEME, DARK_THEME } from 'utils/themes';
import MovieAPI from '../api/MovieAPI';
import UserAPI from '../api/UserAPI';

const CHANGE_THEME = 'CHANGE_THEME';
export const SELECTED_THEME = 'SELECTED_THEME';

export const setDarkTheme = () => dispatch => {
  // noinspection JSIgnoredPromiseFromCall
  UserAPI.changeTheme(DARK_THEME);
  localStorage.setItem(SELECTED_THEME, DARK_THEME);
  dispatch({
    type: CHANGE_THEME,
    payload: DARK_THEME,
  })
};

export const setBaseTheme = () => dispatch => {
  // noinspection JSIgnoredPromiseFromCall
  UserAPI.changeTheme(BASE_THEME);
  localStorage.setItem(SELECTED_THEME, BASE_THEME);
  dispatch({
    type: CHANGE_THEME,
    payload: BASE_THEME,
  });
};

export const setTheme = theme => ({
  type: CHANGE_THEME,
  payload: theme,
})

const initialState = {
  themeName: localStorage.getItem(SELECTED_THEME) || BASE_THEME,
  themeColors: { ...themes[localStorage.getItem(SELECTED_THEME) || BASE_THEME] },
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
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
