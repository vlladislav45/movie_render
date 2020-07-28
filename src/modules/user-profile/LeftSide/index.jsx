import React from 'react';
import { useSelector } from 'react-redux';
import ExtraInfo from './ExtraInfo';
import ProfilePicture from './ProfilePicture';
import {
  BaseInfo,
  BaseInfoLine,
  Wrapper,
} from './styles';

const LeftSide = props => {

  const { username, email } = useSelector(({ auth: { loggedInUser }}) => ({
    username: loggedInUser.username,
    email: loggedInUser.email
  }));

  return (
    <Wrapper>
      <ProfilePicture/>
      <BaseInfo>
        <BaseInfoLine title='You need to go to security to change username'>{username}</BaseInfoLine>
        <BaseInfoLine title='You need to go to security to change email'>{email}</BaseInfoLine>
      </BaseInfo>
      <ExtraInfo/>
    </Wrapper>
  );
};

export default LeftSide;
