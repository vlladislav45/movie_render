import React from 'react';

import { StyledContainer, StyledProfileCircle } from './styles';

const ProfileCircle = ({ size = 50, photoUrl, ...rest }) => {
  const url = photoUrl || require('../../../assets/profile/blank-profile.png');

  return (
    <StyledContainer
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
