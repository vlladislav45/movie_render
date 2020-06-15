import React from 'react';
import { useSelector } from 'react-redux';
import { StyledAuthButton } from './style';

const AuthButton = ({ title, onClick, ...rest }) => {

  const { themeColors: { neon, textColor } } = useSelector(({ themeReducer: { themeColors } }) => ({
    themeColors,
  }));


  return (
    <StyledAuthButton
      className="auth-btn"
      onClick={onClick}
      background={neon}
      color={textColor}
      {...rest}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {title}
    </StyledAuthButton>
  );
};

export default AuthButton;
