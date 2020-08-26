import React, { useEffect, useRef } from 'react';

export default function useTraceUpdate(props) {
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      console.group('ChangedProps')
      console.log(changedProps);
      console.groupEnd()
    }
    prev.current = props;
  });
}