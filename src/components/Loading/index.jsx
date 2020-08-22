import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DARK_THEME } from 'utils/themes';
import { createSelector } from 'reselect';
import {
  CogWheel,
  CogWheelContainer,
  LoadingInner,
  LoadingLogo,
  LoadingOuter,
  LogoAndAnimationContainer
} from './styles';

const selector = createSelector(
  ({ themeReducer }) => themeReducer.themeName,
  themeName => ({ selectedTheme: themeName }),
);

const Loading = ({ isLoading = true, elevation = 0, onlyCogWheel = false }) => {
  const { selectedTheme } = useSelector(selector);
  
  function renderLoading() {
    return (
      <LoadingOuter
        className='loading'
        elevation={elevation}
        $loading={isLoading}
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

export default React.memo(Loading);
