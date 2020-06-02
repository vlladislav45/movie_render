import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { attemptLogin, logout } from 'reducers/auth';

import './styles.css';
import { AuthButton, ProfileCircle } from 'components/basic';

const AuthNav = () => {
    const dispatch = useDispatch();

    const { isLoggedIn } = useSelector(({ auth }) => ({
        isLoggedIn: auth.isLoggedIn,
    }));
    
    const login = () => {
        // TODO: take credentials from input
        dispatch(attemptLogin('', ''));
    }

    const logOut = () => dispatch(logout());
    
    return isLoggedIn 
    ? (
        <div className='auth'>
            <ProfileCircle />
            <AuthButton 
                title='logout'
                onClick={logOut}
            />
        </div>
    )
    : (
    <div className='auth'>
        <AuthButton 
            title = 'login'
            onClick = {login}
        />
        <AuthButton 
            title = 'register'
            onClick = {login}
        />
    </div>
    )
}

export default AuthNav;