import React, { useEffect, useRef, useState } from 'react';
import { CogWheel, LoadingInner, LoadingOuter } from './styles';

const Loading = ({ isLoading = true, elevation = 0 }, ref) => {
  const timeout = useRef(0);
  const [render, toggleRender] = useState(true);
  useEffect(() => () => clearTimeout(timeout.current), [])
  useEffect(() => {
    if(!isLoading)
      timeout.current = setTimeout(() => toggleRender(false), 700) // Loading fade out delay
  }, [isLoading])
  
  if (!render)
    return null;
  function renderLoading () {
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
            <CogWheel className="first"/>
            <CogWheel className="second"/>
            <CogWheel className="third"/>
          </LoadingInner>
        </LoadingOuter>
    );
  }

  return (
    renderLoading()
  );
};

export default React.forwardRef(Loading);
