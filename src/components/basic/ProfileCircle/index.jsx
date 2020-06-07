import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleUserDropDown } from 'reducers/uiReducer'

import { StyledContainer, StyledProfileCircle, HoverDiv } from './styles';

const ProfileCircle = ({ size = 50, elevation = 0, photoUrl, ...rest }) => {
  const dispatch = useDispatch();

  const url = photoUrl || require('../../../assets/profile/blank-profile.png');

  const toggleHover = () => {
    dispatch(toggleUserDropDown());
  };

  return (
    <StyledContainer
      onClick={toggleHover}
      elevation={elevation}
      {...rest}
    >
      <StyledProfileCircle
        size={size}
        url={url}
      />
    </StyledContainer>
  );
};

export default ProfileCircle;
