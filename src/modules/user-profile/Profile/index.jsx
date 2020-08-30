import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { capitalize } from 'lodash';
import { updateUserData } from 'reducers/userReducer';
import EditablePair from './EditablePair';
import ProfilePicture from './ProfilePicture';
import {
  EditableInfo,
  ProfilePictureContainer, ReadOnlyInfo,
  Wrapper,
} from './styles';


const UNKNOWN = 'Unknown';
const GENDER_VALIDATOR = /^(male|female)$/;
const selector = createSelector(
  store => store.userReducer.user.userInfo,
  store => store.auth.loggedInUser.userId,
  (userInfo, userId) => ({ ...userInfo, userId })
);
const Profile = () => {
  const dispatch = useDispatch();
  const { firstName, gender, lastName, userId } = useSelector(selector);
  
  const handleChange = useCallback((parameterName, parameterValue) => {
    dispatch(updateUserData(parameterName, parameterValue, userId));
  }, [])
  return (
    <Wrapper>
      <ProfilePictureContainer>
        <ProfilePicture/>
      </ProfilePictureContainer>
      <ReadOnlyInfo>
      
      </ReadOnlyInfo>
      <EditableInfo>
        <EditablePair label='First Name:' value={firstName || UNKNOWN} pairLabelRaw='firstName'
                      onChange={handleChange}/>
        <EditablePair label='Last Name:' value={lastName || UNKNOWN} pairLabelRaw='lastName' onChange={handleChange}/>
        <EditablePair
          validator={GENDER_VALIDATOR} helperText={'"male" or "female"'}
          label='Gender:' value={capitalize(gender) || UNKNOWN} pairLabelRaw='gender' onChange={handleChange}
        />
      </EditableInfo>
    </Wrapper>
  );
};

export default Profile;
