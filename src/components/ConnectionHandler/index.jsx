import BaseAPI, { RETRY_CONNECTION_TIMEOUT } from 'api/BaseAPI';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { finishedRequest, serverUp } from 'reducers/connectionReducer';
import { enqueueSnackbarMessage } from 'reducers/uiReducer';
import { checkInternetConnection, ConnectionStatus } from 'utils/apiUtils';
import Timer from '../Timer';

/**
 * Utility component for managing connection
 */
const ConnectionHandler = () => {
  const dispatch = useDispatch();

  const {
    networkOnline, serverOnline, internetOnline,
    requestsQueue, primary,
  } = useSelector(
    ({ connectionReducer, themeReducer }) => ({
      networkOnline: connectionReducer.networkOnline,
      serverOnline: connectionReducer.serverOnline,
      internetOnline: connectionReducer.internetOnline,
      requestsQueue: connectionReducer.requestsQueue,
      primary: themeReducer.themeColors.primary,
    }));

  //TODO: Find a way to execute the request's callbacks
  // maybe save the callbacks in a variable
  function resumeRequests() {
    window.location.reload();
    // requestsQueue.forEach(async req => {
    //   await BaseAPI.request(req);
    //   dispatch(finishedRequest(req));
    // });
  }

  async function retryConnection () {
    dispatch(serverUp());
    // noinspection JSIgnoredPromiseFromCall
    const connectionStatus = await checkInternetConnection();
    switch (connectionStatus) {
      case ConnectionStatus.ONLINE:
        resumeRequests();
    }
  }

  const errorMessage = msg => (
    <>
      {msg}
      <span style={{ color: primary }}>
        {' Automatic retry after: '}
        <Timer time={RETRY_CONNECTION_TIMEOUT}
               onFinish={retryConnection}/>
        {'s'}
        </span>
    </>
  );

  const enqueueError = msg => dispatch(enqueueSnackbarMessage(
    errorMessage(msg),
    { ['retry now']: retryConnection },
    {
      closeOnAction: ['retry now'],
      autoCloseAfter: RETRY_CONNECTION_TIMEOUT,
    },
  ));

  useEffect(() => {
    if (!serverOnline)
      enqueueError('Server is not responding!');
  }, [serverOnline]);

  useEffect(() => {
    if (!networkOnline)
      enqueueError('No internet connection');
  }, [networkOnline]);

  useEffect(() => {
    if (!internetOnline)
      enqueueError(
        'There seems to be a problem with your network connection');
  }, [internetOnline]);

  return <div style={{ display: 'none' }}/>;
};

export default ConnectionHandler;
