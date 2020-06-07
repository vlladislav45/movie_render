import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleUserDropDown } from 'reducers/uiReducer';
import { ReactComponent as ArrowIcon } from 'assets/icons/arrow_drop_down-24px.svg';
import { ProfileCircle } from '../basic';
import { ArrowIconContainer, Username, StyledProfileButton } from './styles';

export const ProfileButton = () => {
  const dispatch = useDispatch();

  const toggleHover = () => {
    dispatch(toggleUserDropDown());
  };

  const { loggedInUser: { username } } = useSelector(({ auth }) => ({
    loggedInUser: auth.loggedInUser,
  }));

  return (
    <StyledProfileButton
      shouldElevateWhenHover={true}
      onClick={toggleHover}
    >
      <ProfileCircle/>
      <Username>
        {username}
      </Username>
      <ArrowIconContainer>
        <ArrowIcon/>
      </ArrowIconContainer>
    </StyledProfileButton>
  );
};

export default ProfileButton;