import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleUserDropDown } from 'reducers/uiReducer';
import withRipple from 'HOC/withRipple';
import { ProfileCircle } from '../basic';
import { ReactComponent as ArrowIcon } from 'assets/icons/arrow_drop_down-24px.svg';
import { ArrowIconContainer, StyledProfileButton, Username } from './styles';

export const ProfileButton = () => {
  const dispatch = useDispatch();

  const toggleDropDown = () => {
    dispatch(toggleUserDropDown());
  };

  const {
    loggedInUser: { username },
    isOpen,
  } = useSelector(({ auth, uiReducer: { userDropDownOpen } }) => ({
    loggedInUser: auth.loggedInUser,
    isOpen: userDropDownOpen,
  }));

  return (
    <StyledProfileButton
      elevation={6}
      onClick={toggleDropDown}
      shouldElevateWhenHover
    >
      <ProfileCircle size={36} />
      <Username>
        {username}
      </Username>
      <ArrowIconContainer isFlipped={isOpen}>
        <ArrowIcon/>
      </ArrowIconContainer>
    </StyledProfileButton>
  );
};

export default withRipple(ProfileButton);
