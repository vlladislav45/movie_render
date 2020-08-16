import React, { useEffect, useRef, useState } from 'react';
import {
  CogWheel,
  CogWheelContainer,
  LoadingInner,
  LoadingLogo,
  LoadingOuter,
  LogoAndAnimationContainer
} from './styles';
import { useSelector } from 'react-redux';
import { DARK_THEME } from '../../utils/themes';

const Loading = ({ isLoading = true, elevation = 0, onlyCogWheel = false }, ref) => {
  const { selectedTheme } = useSelector(({ themeReducer }) => ({
    selectedTheme: themeReducer.themeName,
  }))
  
  function renderLoading() {
    return (
      <LoadingOuter
        ref={ref}
        className='loading'
        elevation={elevation}
      >
        <LoadingInner
          elevation={elevation}
          $loading={isLoading}
        >
          {!onlyCogWheel
            ? (
              <LogoAndAnimationContainer>
                <LoadingLogo
                  textColor={selectedTheme === DARK_THEME ? 'primary' : 'secondary'}
                  robotColor={selectedTheme === DARK_THEME ? 'primary' : 'secondary'}
                />
                <CogWheelContainer>
                  <CogWheel className="first"/>
                  <CogWheel className="second"/>
                  <CogWheel className="third"/>
                </CogWheelContainer>
              </LogoAndAnimationContainer>
            )
            : (
              <CogWheelContainer>
                <CogWheel $onlyCogWheel={onlyCogWheel} className="first"/>
                <CogWheel $onlyCogWheel={onlyCogWheel} className="second"/>
                <CogWheel $onlyCogWheel={onlyCogWheel} className="third"/>
              </CogWheelContainer>
            )
          }
        </LoadingInner>
      </LoadingOuter>
    );
  }
  
  return (
    renderLoading()
  );
};

export default React.forwardRef(Loading);
