import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthButton } from 'components/basic';
import { logout } from 'reducers/auth';

import { StyledDropDown } from './styles.js';

export const DropDown = () => {
  const dispatch = useDispatch();

  const { isOpen } = useSelector(({
    uiReducer: { userDropDownOpen },
    auth: { isLoggedIn },
  }) => ({
    isOpen: userDropDownOpen && isLoggedIn,
  }));

  const logOut = () => dispatch(logout());

  return (
    <StyledDropDown
      isOpen={isOpen}
    >
        <AuthButton
          title='logout'
          onClick={logOut}
        />
    </StyledDropDown>
  )
};

export default DropDown;
