import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { throttle } from 'lodash';
import { StyledSingleTab } from './styles';

export default React.forwardRef((props, ref) => {
  const { tabName, onMouseDown, onMouseUp, onMouseOut, onClick, onLoad, ...rest } = props;

  function mouseDown (e) {
    e.stopPropagation();
    onMouseDown(e, tabName);
  }

  //Same for mouse out and mouse up
  function mouseUp (e) {
    e.stopPropagation();
    onMouseUp(tabName);
    onClick(tabName);
  }

  function hoverOut (e) {
    e.stopPropagation();
    onMouseUp(tabName);
  }

  return (
    <StyledSingleTab
      {...rest}
      ref={ref}
      onMouseDown={mouseDown}
      onMouseUp={mouseUp}
      onMouseOut={hoverOut}
    >
      {tabName}
    </StyledSingleTab>
  );
});
