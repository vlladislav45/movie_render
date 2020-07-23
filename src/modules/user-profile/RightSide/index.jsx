import React from 'react';
import { Tabs } from 'components';
import Moderator from './Moderator';
import Preferences from './Preferences';
import RecentActivity from './RecentActivity';
import Security from './Security';
import { RightSideWrapper } from './styles';

const RightSide = () => {

  return (
    <RightSideWrapper>
      <Tabs
        tabs={[
          {
            tabName: 'Recent activity',
            tabContent: <RecentActivity />,
          },
          {
            tabName: 'Security',
            tabContent: <Security />
          },
          {
            tabName: 'Preferences',
            tabContent: <Preferences />
          },
          {
            tabName: 'Moderator',
            tabContent: <Moderator />,
            isActive: true,
          },
        ]}
      />
    </RightSideWrapper>
  );
};

export default RightSide;
