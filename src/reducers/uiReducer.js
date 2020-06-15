const TOGGLE_USER_DROP_DOWN = 'TOGGLE_USER_DROP_DOWN';
const CLOSE_DROP_DOWN = 'CLOSE_DROP_DOWN';

export const toggleUserDropDown = () => ({
  type: TOGGLE_USER_DROP_DOWN,
});

export const closeUserDropDown = () => ({
  type: CLOSE_DROP_DOWN,
})

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
    case CLOSE_DROP_DOWN:
      return {
        ...state,
        userDropDownOpen: false,
      }
    default: return state
  }
}
