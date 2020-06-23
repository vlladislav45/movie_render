import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { attemptLogin } from 'reducers/auth';
import { AuthButton } from 'components/basic';
import { ProfileButton } from 'components';
import { SearchBar } from '../index';
import { AuthNavContainer, SearchBarContainer } from './styles';

const AuthNav = props => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector(({ auth }) => ({
    isLoggedIn: auth.isLoggedIn,
  }));

  const login = () => {
    // TODO: take credentials from input
    dispatch(attemptLogin('stefan', 'stefan123'));
  };

  function renderLoggedInNav() {
    return (
      <div className='logged-in auth'>
        <ProfileButton/>
      </div>
    );
  }

  function renderAnonymousNav() {
    return (
      <div className='auth'>
        <AuthButton
          title='login'
          onClick={login}
        />
        <AuthButton
          title='register'
          onClick={login}
        />
      </div>
    );
  }

  return (
    <AuthNavContainer {...props}>
      {isLoggedIn
        ? renderLoggedInNav()
        : renderAnonymousNav()
      }
    </AuthNavContainer>
  );
};

export default AuthNav;
