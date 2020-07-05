import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Timer = ({
  time, countDirection = 'DESC', endTime = 0, interval = 1000,
  onStart, onFinish, ...rest
}) => {
  const [timerValue, setTimerValue] = useState(time - 1000);

  useEffect(() => {
    if (onStart)
      onStart();
  }, []);

  //https://stackoverflow.com/a/53990887
  useEffect(() => {
      const id = setTimeout(() => {
        setTimerValue(countDirection === 'ASC' ? timerValue + 1000 : timerValue - 1000);
      }, interval);

      if (timerValue === endTime) {
        clearInterval(id);
        if (onFinish)
          onFinish();
      }

      return () => {
        clearInterval(id);
      };
    },
    [timerValue],
  );

  return (
    <span {...rest}>
      {timerValue / 1000}
    </span>
  );
};

Timer.propTypes = {
  time: PropTypes.number.isRequired, // Time to count
  countDirection: PropTypes.oneOf(['ASC', 'DESC']), // Should increase or decrease
  interval: PropTypes.number, // Interval between time iterations
  endTime: PropTypes.number, // Count the timer until this value
  onFinish: PropTypes.func, // Callback after timer expires
  onStart: PropTypes.func, // Callback when timer starts
};

export default Timer;
