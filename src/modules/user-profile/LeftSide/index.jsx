import React from 'react';
import ExtraInfo from './ExtraInfo';
import ProfilePicture from './ProfilePicture';
import {
  BaseInfo,
  BaseInfoLine,
  Wrapper,
} from './styles';

const STUB_DATA = {
  username: 'kopa4a',
  email: 'a582hs@gmail.com',
};
const LeftSide = props => {

  return (
    <Wrapper>
      <ProfilePicture/>
      <BaseInfo>
        <BaseInfoLine>{STUB_DATA.username}</BaseInfoLine>
        <BaseInfoLine>{STUB_DATA.email}</BaseInfoLine>
      </BaseInfo>
      <ExtraInfo/>
    </Wrapper>
  );
};

export default LeftSide;
