import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { capitalize } from 'lodash';
import { updateUserData } from 'reducers/userReducer';
import EditablePair from './EditablePair';
import ProfilePicture from './ProfilePicture';
import { EditableInfo, ProfilePictureContainer, ReadOnlyInfo, Wrapper, } from './styles';
import UserAPI from '../../../api/UserAPI';


const UNKNOWN = 'Unknown';
const GENDER_VALIDATOR = /^(male|female)$/;
const selector = createSelector(
  store => store.userReducer.user.userInfo,
  store => store.auth.loggedInUser.userId,
  (userInfo, userId) => ({ ...userInfo, userId })
);
const Profile = () => {
  const dispatch = useDispatch();
  const { firstName, gender, lastName, createdTime, userId } = useSelector(selector);
  
  const handleChange = useCallback((parameterName, parameterValue) => {
    dispatch(updateUserData(parameterName, parameterValue, userId));
  }, [])
  
  useEffect(() => {
    UserAPI.getReviewsByUser(userId, 15, 0).then(({ data }) => {
      console.group('res');
      console.log(data);
      console.groupEnd();
    });
  }, [])
  
  return (
    <Wrapper>
      <ProfilePictureContainer>
        <ProfilePicture/>
      </ProfilePictureContainer>
      <ReadOnlyInfo>
        <div>{createdTime}</div>
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
