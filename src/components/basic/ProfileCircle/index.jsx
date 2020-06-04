import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DropDown } from 'components/DropDown';
import { toggleUserDropDown } from 'reducers/uiReducer'

import { StyledContainer, StyledProfileCircle, HoverDiv } from './styles';

const ProfileCircle = ({ size = 50, photoUrl, ...rest }) => {
  const dispatch = useDispatch();

  const [ elevation, setElevation ] = useState(rest.elevation || 15);
  const [ hovered, setHovered ] = useState(false);
  const url = photoUrl || require('../../../assets/profile/blank-profile.png');

  const toggleHover = isHovered => {
    dispatch(toggleUserDropDown())
    if (isHovered) {
      setElevation(elevation + 4);
      setHovered(true);
    } else {
      setElevation(elevation - 4);
      setHovered(false);
    }
  }

  return (
    <StyledContainer
      onMouseEnter={() => toggleHover(true)}
      elevation={elevation}
      {...rest}
    >
      <HoverDiv
        isVisible={hovered}
        onMouseLeave={() => toggleHover(false)}
      />
      <StyledProfileCircle
        size={size}
        url={url}
      />
    </StyledContainer>
  );
};

export default ProfileCircle;
