import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import InitializationLayer from './InitializationLayer';
import store from './redux-store';
import './index.css';
import * as serviceWorker from './serviceWorker';
import disableDevTools from './utils/disableDevTools';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    // logOnDifferentValues: true,
    trackAllPureComponents: true,
    trackExtraHooks: [[ReactRedux, "useSelector"]]
  });
}

// disableDevTools();
const { Provider } = ReactRedux;
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <InitializationLayer/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// EXPERIMENTAL CONCURRENT MODE
// ReactDOM.unstable_createRoot(
//   document.getElementById('root')
// ).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <InitializationLayer/>
//     </Provider>
//   </React.StrictMode>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
