import React from 'react';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import { UserProfileWrapper } from './styles';

const UserProfile = () => {

  return (
    <UserProfileWrapper>
      <LeftSide/>
      <RightSide />
    </UserProfileWrapper>
  );
};

export default UserProfile;
