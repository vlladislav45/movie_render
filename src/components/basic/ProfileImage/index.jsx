import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { API_URL } from 'api/BaseAPI';
import ResourcesAPI from 'api/ResourcesAPI';
import useFakePromise from 'hooks/useFakePromise';
import { StyledProfileCircle } from './styles';
import { createSelector } from 'reselect';

const selector = createSelector(
  store => store.auth.loggedInUser.profileImage,
  store => store.userReducer.user.userInfo.photoUrl,
  store => store.auth.loggedInUser.username,
  (profileImage, photoUrl, username) => ({
    username,
    profileImage: photoUrl || profileImage
  })
)
export const IMAGE_BASE_PATH = API_URL + 'user/picture/';
const ProfileImage = ({ size = 50, shape = 'circle', ...rest }) => {
  const fakePromise = useFakePromise();
  const { profileImage, username } = useSelector(selector);
  
  const [imageUrl, setImageUrl] = useState(null);
  
  const url = useMemo(() => profileImage
    ? IMAGE_BASE_PATH + username + `/${profileImage}`
    : require('../../../assets/profile/blank-profile.png'), [profileImage]);
  
  useEffect(() => {
    if (!fakePromise) return;
    if (!profileImage) {
      setImageUrl(url);
      return;
    }
    
    const getFetchPromise = () => ResourcesAPI.fetchResource(url);
    Promise.race([getFetchPromise(), fakePromise])
      .then(res => res && setImageUrl(URL.createObjectURL(res.data)))
      .catch(err => setImageUrl(require('../../../assets/profile/blank-profile.png')));
  }, [url, fakePromise])
  
  const isSameWidthHeight = (typeof size === 'number');
  const width = isSameWidthHeight ? size : size.width;
  const height = isSameWidthHeight ? size : size.height;
  
  return (
    <StyledProfileCircle
      width={width}
      height={height}
      isCircle={shape === 'circle'}
      $isLoading={imageUrl === null}
      src={imageUrl}
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
