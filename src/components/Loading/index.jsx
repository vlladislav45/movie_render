import React from 'react';
import { CogWheel, LoadingInner, LoadingOuter } from './styles';

const Loading = ({ isLoading = true, elevation = 0 }) => {

  function renderLoading () {
    return (
      isLoading && (
        <LoadingOuter className='loading' elevation={elevation}>
          <LoadingInner elevation={elevation}>
            <CogWheel className="first"/>
            <CogWheel className="second"/>
            <CogWheel className="third"/>
          </LoadingInner>
        </LoadingOuter>
      )
    );
  }

  return (
    renderLoading()
  );
};

export default Loading;
