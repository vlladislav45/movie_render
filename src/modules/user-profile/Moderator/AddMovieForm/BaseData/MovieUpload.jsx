import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'components/basic';
import { useDispatch } from 'react-redux';
import { updateUploadInfo } from '../../../../../reducers/moderatorReducer';
import { VIDEO, VIDEO_PREVIEW_ERROR } from '../../UploadConstants';
import { MovieUploadBtn } from './styles';

export default () => {
  const dispatch = useDispatch();
  const videoUploadRef = useRef();

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
      alert('Wrong video format');
    } else {
      dispatch(updateUploadInfo(VIDEO, URL.createObjectURL(file)));
      if (file.type !== 'video/mp4')
        dispatch(
          updateUploadInfo(
            VIDEO_PREVIEW_ERROR,
            'Video will be uploaded, but preview is unavailable.You can only preview mp4 video format'));
    }
  }

  function openUploadVideo (e) {
    e.preventDefault();
    videoUploadRef.current.click();
  }

  // TODO:
  function uploadVideo (e) {
    e.preventDefault();
    // const fd = new FormData();
    // fd.append('file', videoData, `video_${Math.random()}.mp4`);
    // ModeratorAPI.uploadMovie(fd, (e) => {
    //   const progress = Math.round((e.loaded * 100) / e.total);
    //   updateProgress(progress);
    // });
  }

  return (
    <MovieUploadBtn>
      {progress && <progress max={100} value={progress}/>}
      <Button text='Upload movie' onClick={openUploadVideo}/>
      <input type='file' hidden ref={videoUploadRef}/>
    </MovieUploadBtn>
  );
}
