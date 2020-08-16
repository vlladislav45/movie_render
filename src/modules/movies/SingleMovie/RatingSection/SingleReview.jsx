import React, { useEffect, useState } from 'react';
import { last } from 'lodash';
import UserAPI from 'api/UserAPI';
import ResourcesAPI from 'api/ResourcesAPI';
import { IMAGE_BASE_PATH } from 'components/basic/ProfileImage';
import useFakePromise from 'hooks/useFakePromise';
import {
  AuthorImage,
  AuthorsName, OwnImage,
  ReviewContent,
  ReviewRating,
  StyledSingleReview
} from './SingleReviewStyles';


const SingleReview = ({ review: { comment, movieRating, username }, isOwn }) => {
  const fakePromise = useFakePromise();
  const [userData, setUserData] = useState({});
  
  
  // TODO: Open profile page
  function openProfile() {
  
  }
  
  useEffect(() => {
    if (isOwn || !fakePromise) return;
    const getUserPromise = () => UserAPI.getByUsername(username);
    const getResourcePromise = userImages => ResourcesAPI.fetchResource(IMAGE_BASE_PATH + username + '/' + last(userImages).imageName);
    Promise.race([fakePromise, getUserPromise()])
    .then(res => {
      if (!res) return;
      const { data } = res;
      const { userImages, id } = data.userInfo;
      setUserData({
        ...userData,
        id,
      });
      if (userImages.length > 0) {
        Promise.race([fakePromise, getResourcePromise(userImages)])
        .then(res => {
          if (!res) return;
          const { data: image } = res;
          setUserData({
            ...userData,
            userImage: URL.createObjectURL(image)
          })
        })
      } else {
        setUserData({
          ...userData,
          userImage: require('assets/profile/blank-profile.png')
        })
      }
    })
  }, [fakePromise])
  
  return (
    <StyledSingleReview
    >
      <AuthorsName
        title='View profile'
        onClick={openProfile}
      >{username}</AuthorsName>
      {isOwn
        ? <OwnImage shape='rectangle'/>
        : <AuthorImage
          $fadeIn={!!userData.userImage}
          src={userData.userImage}
          alt={`profile image of ${username}`}
        />
      }
      <ReviewContent>
        {comment}
      </ReviewContent>
      <ReviewRating
        rating={movieRating}
        maxStars={5}
        starSize='18px'
        color='onSurface'
      />
    </StyledSingleReview>
  );
};

export default SingleReview;