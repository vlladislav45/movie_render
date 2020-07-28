import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { API_URL } from '../../../api/BaseAPI';

import { StyledProfileCircle } from './styles';

const IMAGE_BASE_PATH = API_URL + 'user/';
const ProfileImage = ({ size = 50, shape = 'circle', ...rest }) => {
  const { profileImage, username } = useSelector(
    ({ auth: { loggedInUser }, userReducer: { user } }) => ({
      profileImage: user.userInfo.photoUrl || loggedInUser.profileImage ,
      username: loggedInUser.username,
    }));


  const url = useMemo(() => profileImage
    ? IMAGE_BASE_PATH + username + `/${profileImage.imageName}`
    : require('../../../assets/profile/blank-profile.png'), [profileImage]);


  const isSameWidthHeight = (typeof size === 'number');
  const width = isSameWidthHeight ? size : size.width;
  const height = isSameWidthHeight ? size : size.height;
  return (
    <StyledProfileCircle
      width={width}
      height={height}
      isCircle={shape === 'circle'}
      src={url}
      alt='Avatar'
      {...rest}
    />
  );
};

ProfileImage.propTypes = {
  // dimensions of the image either number for same height and width or an object
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    })]),
  shape: PropTypes.oneOf(['circle', 'rectangle']),
};

export default ProfileImage;
