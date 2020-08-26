import React from "react";

const RecentActivity = React.lazy(() => import('./RecentActivity'));
const Moderator = React.lazy(() => import('./Moderator'));
const Security = React.lazy(() => import('./Security'));
// const Preferences = React.lazy(() => import('./Preferences'));
const Profile = React.lazy(() => import('./Profile'));

export default [
  {
    tabName: 'Profile',
    tabContent: Profile,
    isActive: true,
  },
  {
    tabName: 'Recent activity',
    tabContent: RecentActivity,
  },
  {
    tabName: 'Security',
    tabContent: Security
  },
  {
    tabName: 'Moderator',
    tabContent: Moderator,
  },
]