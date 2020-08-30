import React from 'react';
import UserAPI from 'api/UserAPI';
import withUpload from 'modules/user-profile/hoc/withUpload';
import {
  StyledProfilePicture,
} from './styles';

/* TODO: See previous images and be able to return to previous */
const ProfilePicture = (props: { toggleFileUpload: () => void }) => (
  <StyledProfilePicture
    size={200}
    shape='rectangle'
    onClick={props.toggleFileUpload}
  />
);

// @ts-ignore
export default withUpload(['image/jpeg', 'image/png'], UserAPI.uploadImage)(ProfilePicture);
