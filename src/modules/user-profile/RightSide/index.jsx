import React from 'react';
import { Tabs } from 'components';
import { RightSideWrapper } from './styles';
import useSuspenseAnimation from '../../../hooks/useSuspenseAnimation';

const RecentActivity = React.lazy(() => import('./RecentActivity'));
const Moderator = React.lazy(() => import('./Moderator'));
const Security = React.lazy(() => import('./Security'));
const Preferences = React.lazy(() => import('./Preferences'));

const RightSide = () => {
  // const { DeferredComponent: RecentActivity, ...mainPageProps } = useSuspenseAnimation(
  //   'modules/user-profile/RightSide/RecentActivity'
  // );
  // const { DeferredComponent: ProfilePage, ...profilePageProps } = useSuspenseAnimation(
  //   'pages/ProfilePage'
  // );
  // const { DeferredComponent: SingleMoviePage, ...singleMovieProps } = useSuspenseAnimation(
  //   'pages/SingleMoviePage'
  // );

  // const [isEnabled, setEnabled] = React.useState(false);
  // return (
  //   <div>
  //     <button onClick={() => setEnabled(b => !b)}>Toggle Component</button>
  //     <React.Suspense fallback={<Fallback {...fallbackProps} />}>
  //       {isEnabled && <DeferredComponent />}
  //     </React.Suspense>
  //   </div>
  // );
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
