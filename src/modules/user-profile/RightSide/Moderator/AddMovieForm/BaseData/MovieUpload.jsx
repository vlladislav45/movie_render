import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'components/basic';
import ModeratorAPI from 'api/ModeratorAPI';


export default props => {
  const videoUploadRef = useRef();

  const [videoData, setVideoData] = useState();
  const [progress, updateProgress] = useState(null);

  useEffect(() => {
    if (!videoUploadRef.current)
      return;

    videoUploadRef.current.addEventListener('change', uploadMovie);

    return () => {
      videoUploadRef.current.removeEventListener('change', uploadMovie);
    };
  }, [videoUploadRef.current]);

  function uploadMovie () {
    const file = videoUploadRef.current.files[0];

    // TODO: What extension should movies be?
    // TODO: Max file size?

    if (!file.type.includes('video') &&
      file.type !== 'video/avi' &&
      file.type !== 'video/mp4') {
      console.log('ERROR');
    } else {
      setVideoData(file);
    }
  }

  function openUploadVideo (e) {
    e.preventDefault();
    videoUploadRef.current.click();
  }

  function uploadVideo (e) {
    e.preventDefault();
    const fd = new FormData();
    fd.append('file', videoData, `video_${Math.random()}.mp4`);
    ModeratorAPI.uploadMovie(fd, (e) => {
      const progress = Math.round((e.loaded * 100) / e.total);
      updateProgress(progress);
    });
  }

  return (
    <>
      {videoData && (
        <>
          <video
            width={300}
            height={300 * (16 / 9)}
            controls
          >
            <source src={URL.createObjectURL(videoData)}/>
          </video>
          <Button text='Confirm' onClick={uploadVideo}/>
        </>
      )}
      {progress && <progress max={100} value={progress}/>}
      <Button text='Upload movie' onClick={openUploadVideo}/>
      <input type='file' hidden ref={videoUploadRef}/>
    </>
  );
}
