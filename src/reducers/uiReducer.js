const TOGGLE_USER_DROP_DOWN = 'TOGGLE_USER_DROP_DOWN';

export const toggleUserDropDown = () => ({
  type: TOGGLE_USER_DROP_DOWN,
});

const initialState = {
  userDropDownOpen: false,
}

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case TOGGLE_USER_DROP_DOWN:
      return {
        ...state,
        userDropDownOpen: !state.userDropDownOpen,
      }
    default: return state
  }
}
