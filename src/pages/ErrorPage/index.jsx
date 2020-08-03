import React from 'react';
import { useHistory } from 'react-router';
import { ErrorMessage, ErrorPageWrapper, ErrorTitle } from './styles';

const ErrorPage = () => {
  const history = useHistory();
  
  if (history.location.state.error === null)
    history.push('/')
  
  return (
    <ErrorPageWrapper elevation={6}>
      <ErrorTitle>error</ErrorTitle>
      <ErrorMessage>
        {history.location.state.error}
      </ErrorMessage>
    </ErrorPageWrapper>
  );
};

export default ErrorPage;