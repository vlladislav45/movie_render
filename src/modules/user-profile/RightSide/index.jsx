import React from 'react';
import { Tabs } from 'components';
import { RightSideWrapper } from './styles';
import useSuspenseAnimation from '../../../hooks/useSuspenseAnimation';

const RecentActivity = React.lazy(() => import('../RecentActivity'));
const Moderator = React.lazy(() => import('../Moderator'));
const Security = React.lazy(() => import('../Security'));
const Preferences = React.lazy(() => import('../Preferences'));

const RightSide = () => {
  return (
    <RightSideWrapper>
      <Tabs
        tabs={[
          {
            tabName: 'Recent activity',
            tabContent: RecentActivity,
          },
          {
            tabName: 'Security',
            tabContent: Security
          },
          {
            tabName: 'Preferences',
            tabContent: Preferences
          },
          {
            tabName: 'Moderator',
            tabContent: Moderator,
            isActive: true,
          },
        ]}
      />
    </RightSideWrapper>
  );
};

export default RightSide;
