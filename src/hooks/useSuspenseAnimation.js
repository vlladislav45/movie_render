import React, { useEffect } from 'react';

/*
AUTHOR: https://stackoverflow.com/a/61598220

Possible State transitions: LAZY -> IMPORT_FINISHED -> ENABLED
- LAZY: React suspense hasn't been triggered yet.
- IMPORT_FINISHED: dynamic import has completed, now we can trigger animations.
- ENABLED: Deferred component will now be displayed
*/
const TransitionStates = {
  IMPORT_FINISHED: 0,
  ENABLED: 1,
  LAZY: 2,
}

// TODO: Maybe return to this implementation in the future
export default function useSuspenseAnimation(path) {
  const [state, setState] = React.useState(init);

  // const enableComponent = React.useCallback(() => {
  //   if (state.status === TransitionStates.IMPORT_FINISHED) {
  //     setState(prev => ({ ...prev, status: TransitionStates.ENABLED }));
  //     state.deferred.resolve();
  //   }
  // }, [state]);
  
  useEffect(() => {
    if(state.status === TransitionStates.IMPORT_FINISHED)
      setTimeout(state.deferred.resolve, 100);
  }, [state.status])
  
  return {
    hasImportFinished: state.status === TransitionStates.IMPORT_FINISHED,
    Component: state.Component,
  };
  
  function init() {
    const deferred = deferPromise();
    // component object reference  is kept stable, since it's stored in state.
    const Component = React.lazy(() =>
      Promise.all([
        // Added '../' because of dynamic import
        import(`../${path}`).then(imp => {
          setState(prev => ({ ...prev, status: TransitionStates.IMPORT_FINISHED }));
          return imp;
        }),
        deferred.promise
      ]).then(([imp]) => imp)
    );
    
    return {
      status: TransitionStates.LAZY,
      Component,
      deferred
    };
  }
}

// add some async delay for illustration purposes
function fakeDelay(ms) {
  return promise =>
    promise.then(
      data =>
        new Promise(resolve => {
          setTimeout(() => resolve(data), ms);
        })
    );
}

function deferPromise() {
  let resolve;
  const promise = new Promise(_resolve => {
    resolve = _resolve;
  });
  return { resolve, promise };
}
