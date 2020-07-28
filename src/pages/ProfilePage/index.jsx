import React, { useEffect, useState } from 'react';
import UserProfile from 'modules/user-profile/UserProfile';
import { useSelector } from 'react-redux';
import { Loading } from 'components';

export default () => {
  const { isLoading } = useSelector(({ auth: { isLoading } }) => ({
    isLoading,
  }));

  if (isLoading)
    return <Loading/>;

  return <UserProfile/>;
}
