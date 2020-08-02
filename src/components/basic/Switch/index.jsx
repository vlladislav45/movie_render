import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { transitionDurations } from 'config/animationConstants';
import { SwitchContainer, SwitchInput, SwitchThumb, SwitchTrack, RIPPLE_STATE } from './styles';

const { INITIAL, RIPPLE_ON, RIPPLE_OFF } = RIPPLE_STATE;
const { mediumExpand } = transitionDurations;
const Switch = props => {
  const {
    color = 'primary',
    isChecked: checked = false,
    onCheckedStateChange = isChecked => {},
  } = props;
  
  const time = useRef(0);
  const thumbRef = useRef();
  const [isChecked, setIsChecked] = useState(checked);
  const [rippleState, setRippleState] = useState(INITIAL);
  
  function mouseDown() {
    setRippleState(RIPPLE_ON);
    time.current = Date.now();
  }
  
  function mouseUp() {
    const timeSinceMouseDown = Date.now() - time.current;
    setTimeout(() => {
      setRippleState(RIPPLE_OFF)
    }, mediumExpand - timeSinceMouseDown)
  }
  
  function mouseOut() {
    setRippleState(RIPPLE_OFF);
  }
  
  function toggleChecked() {
    setIsChecked(isChecked => !isChecked);
    onCheckedStateChange(!isChecked)
    thumbRef.current.focus();
  }
  
  return (
    <SwitchContainer
      onClick={toggleChecked}
      onMouseUp={mouseUp}
      onMouseDown={mouseDown}
      onMouseOut={mouseOut}
    >
      <SwitchTrack
        $isChecked={isChecked}
        color={color}
      />
      <SwitchInput
        hidden
        onFocus={() => alert('focused')}
        checked={isChecked}
        onChange={toggleChecked}
        type='checkbox'
      />
      <SwitchThumb
        ref={thumbRef}
        tabIndex={-1}
        color={color}
        $isChecked={isChecked}
        $rippleState={rippleState}
      />
    </SwitchContainer>
  );
};

Switch.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary']),
  isChecked: PropTypes.bool,
  onCheckedStateChange: PropTypes.func,
};

export default Switch;