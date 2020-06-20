const TOGGLE_USER_DROP_DOWN = 'TOGGLE_USER_DROP_DOWN';
const CLOSE_DROP_DOWN = 'CLOSE_DROP_DOWN';
const CHANGE_WINDOW_DIMENSIONS = 'CHANGE_WINDOW_DIMENSIONS';

export const changeWindowDimensions = (width, height, device) => ({
  type: CHANGE_WINDOW_DIMENSIONS,
  payload: { width, height, device },
});

export const toggleUserDropDown = () => ({
  type: TOGGLE_USER_DROP_DOWN,
});

export const closeUserDropDown = () => ({
  type: CLOSE_DROP_DOWN,
});

const initialState = {
  windowDimensions: {},
  userDropDownOpen: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_USER_DROP_DOWN:
      return {
        ...state,
        userDropDownOpen: !state.userDropDownOpen,
      };
    case CLOSE_DROP_DOWN:
      return {
        ...state,
        userDropDownOpen: false,
      };
    case CHANGE_WINDOW_DIMENSIONS:
      return {
        ...state,
        windowDimensions: payload,
      };
    default:
      return state;
  }
}
