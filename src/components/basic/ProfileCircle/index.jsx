import React, { useState } from 'react';
import { DropDown } from 'components/DropDown';

import { StyledContainer, StyledProfileCircle } from './styles';

const ProfileCircle = ({ size = 30, photoUrl, ...rest }) => {
  const [ elevation, setElevation ] = useState(rest.elevation || 0);
  const [ hovered, setHovered ] = useState(false);
  const url = photoUrl || require('../../../assets/profile/blank-profile.png');

  const toggleHover = isHovered => {
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
      onMouseLeave={() => toggleHover(false)}
      elevation={elevation}
      {...rest}
    >
      <StyledProfileCircle
        size={50}
        url={url}
      />
      <DropDown isOpen={hovered} />
    </StyledContainer>
  );
};

export default ProfileCircle;