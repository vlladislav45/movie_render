import React, { useEffect, useState } from 'react';
import ResourcesAPI from 'api/ResourcesAPI';
import { IMAGE_BASE_PATH } from 'components/basic/ProfileImage';
import useFakePromise from 'hooks/useFakePromise';
import {
  AuthorImage,
  AuthorsName, DateCreated, OwnImage,
  ReviewContent,
  ReviewRating,
  StyledSingleReview
} from './SingleReviewStyles';


const SingleReview = ({ review: { comment, userRating, username, profileImage, createdTime }, isOwn }) => {
  const fakePromise = useFakePromise();
  const [userImage, setUserImage] = useState(null);

  // TODO: Open profile page
  function openProfile() {
  
  }
  
  useEffect(() => {
  }, [userImage])
  
  useEffect(() => {
    if (!fakePromise || isOwn) return;
    if (!profileImage) {
      const img = require('assets/profile/blank-profile.png');
      setUserImage(img);
      return;
    }
    const getResourcePromise = profileImage => ResourcesAPI.fetchResource(IMAGE_BASE_PATH + username + '/' + profileImage);
    Promise.race([fakePromise, getResourcePromise(profileImage)]).then(res => {
      console.group('gotcha');
      console.log(res);
      console.groupEnd();
      if (!res) return;
      const { data } = res;
      setUserImage(data);
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
          $fadeIn={!!userImage}
          src={userImage}
          alt={`profile image of ${username}`}
        />
      }
      <ReviewContent>
        {comment}
      </ReviewContent>
      <ReviewRating
        rating={userRating}
        maxStars={5}
        starSize='18px'
        color='onSurface'
      />
      {/*TODO: Recreate this */}
      <DateCreated>{new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }).format(createdTime)}</DateCreated>
    </StyledSingleReview>
  );
};

export default SingleReview;