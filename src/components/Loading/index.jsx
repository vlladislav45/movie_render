import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DARK_THEME } from 'utils/themes';
import { createSelector } from 'reselect';
import {
  CogWheel,
  CogWheelContainer,
  LoadingInner,
  LoadingLogo,
  LoadingOuter,
  LogoAndAnimationContainer, OPACITY_TRANSITION_DURATION
} from './styles';

const selector = createSelector(
  ({ themeReducer }) => themeReducer.themeName,
  themeName => ({ selectedTheme: themeName }),
);

const Loading = ({ isLoading = true, elevation = 0, onlyCogWheel = false }) => {
  const { selectedTheme } = useSelector(selector);
  const [shouldRender, setShouldRender] = useState(isLoading);
  useEffect(() => {
    if (!isLoading)
    setTimeout(() => setShouldRender(false), OPACITY_TRANSITION_DURATION);
    else
      setShouldRender(true);
  }, [isLoading])
  
  if (!shouldRender) return null;
  
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
