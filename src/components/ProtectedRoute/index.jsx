import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route } from 'react-router';

const ProtectedRoute = ({
  component: Component,
  authorities = [],
  ...rest
}) => {
  const { isLoggedIn, loggedInUser } = useSelector(({ auth: { isLoggedIn, loggedInUser } }) => ({
    isLoggedIn,
    loggedInUser,
  }));
  let canForward = isLoggedIn;

  return (
    <Route
      {...rest}
      // render={props =>}
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType,
  authorities: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;
