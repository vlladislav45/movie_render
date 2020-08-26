import React from 'react';
import { Tabs } from 'components';
import tabsData from './tabsData';
import { UserProfileWrapper } from './styles';


const UserProfile = () => {
  return (
    <UserProfileWrapper>
      <Tabs
        tabs={tabsData}
      />
    </UserProfileWrapper>
  );
};

export default UserProfile;
