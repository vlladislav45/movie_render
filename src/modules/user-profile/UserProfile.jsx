import React from 'react';
import { Tabs } from 'components';
import tabsData from './tabsData';
import { UserProfileWrapper } from './styles';


const flippedScreenStyle = `
 @media screen and (min-width: 320px) and (max-width: 767px) and (orientation: portrait) {
    html {
      transform: rotate(-90deg);
      transform-origin: left top;
      width: 100vh;
      height: 100vw;
      overflow-x: hidden;
      position: absolute;
      top: 100%;
      left: 0;
    }
  }`.replace(/\n/g, ' ')

const UserProfile = () => {
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = flippedScreenStyle;
    document.head.append(style);
    return () => document.head.removeChild(style);
  }, [])
  
  return (
    <UserProfileWrapper>
      <Tabs
        tabs={tabsData}
      />
    </UserProfileWrapper>
  );
};

export default UserProfile;

