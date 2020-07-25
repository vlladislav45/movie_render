import React, { useEffect, useRef } from 'react';
import { Button } from 'components/basic';

export default props => {

  const posterUploadRef = useRef();

  useEffect(() => {
    if (!posterUploadRef.current)
      return;

    posterUploadRef.current.addEventListener('change', uploadPoster);

    return () => {
      posterUploadRef.current.removeEventListener('change', uploadPoster);
    }
  }, [posterUploadRef.current]);

  function uploadPoster () {
    const file = posterUploadRef.current.files[0];

    // TODO: What extension should image files be
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {

    }
  }

  function openUploadPoster (e) {
    e.preventDefault();
    posterUploadRef.current.click();
  }

  return (
    <>
      <Button text='Upload poster' onClick={openUploadPoster}/>
      <input type='file' hidden ref={posterUploadRef}/>
    </>
  );
}
