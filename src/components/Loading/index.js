import React from 'react';
import { CogWheel, LoadingInner, LoadingOuter } from './styles';

const Loading = ({ isLoading = true }) => {

  function renderLoading () {
    return (
      isLoading && (
        <LoadingOuter className='loading'>
          <LoadingInner>
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
