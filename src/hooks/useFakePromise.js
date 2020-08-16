import React, { useEffect, useRef } from 'react';

/**
 * Passes a promise to use with async function, that updates state
 * use this promise with Promise.race([promise, yourAsyncCode]).then(...)
 * @returns A fake promise, that gets resolved when component unmounts
 */
export default function useFakePromise() {
  const fakeResolve = useRef(function(){});
  const promise = useRef(null);
  
  useEffect(() => {
    // noinspection JSValidateTypes
    promise.current = new Promise(resolve => fakeResolve.current = resolve)
    return () => {
      fakeResolve.current(null);
    }
  }, []);
  
  
  return promise.current;
}