import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from 'reducers/userReducer';
import { enqueueSnackbarMessage } from '../../../../reducers/uiReducer';
import UserAPI from 'api/UserAPI';
import {
  ProfilePictureContainer,
  UpdateImageButton,
  StyledProfilePicture,
} from './styles';
const ProfilePicture = () => {
  // const { username, userImages } = useSelector(
  //   ({ auth: { loggedInUser } }) => ({
  //     username: loggedInUser.username,
  //     userImages: loggedInUser.userImages,
  //   }));
  
  // const [openInput] = useUploadWithPreview(['image/jpeg', 'image/png'], UserAPI.uploadImage)
  

  return (
    <>
      <ProfilePictureContainer>
        <StyledProfilePicture shape='rectangle' />
      </ProfilePictureContainer>
      <UpdateImageButton
        // onClick={openInput}
        type='text'
        color='secondary'
        text='update'
      />
    </>
  );
};

export default ProfilePicture;
