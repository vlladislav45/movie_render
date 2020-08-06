import React, { useState } from 'react';
import { Loading } from '../';
import './style.css';


// TODO: Remove this if a better solution is found
// https://stackoverflow.com/a/61598220
const SuspenseLoading = ({ hasImportFinished, ...rest }) => {
  
  const [isLoading, setIsLoading] = useState(true);
  React.useEffect(() => {
    console.group('hasImportFinished')
    console.log(hasImportFinished)
    console.groupEnd()
    if (hasImportFinished)
      setIsLoading(false);
  }, [hasImportFinished]);
  
  return (
    <Loading isLoading={isLoading} {...rest} />
  )
};


export default SuspenseLoading