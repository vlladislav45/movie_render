import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'components/basic';
import { useDispatch } from 'react-redux';
import { API_URL } from 'api/BaseAPI';
import { updateUploadInfo } from 'reducers/moderatorReducer';
import { VIDEO, VIDEO_PREVIEW_ERROR } from '../../UploadConstants';
import MovieUploadWorker from '../../movieUpload.worker';
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
  
  function uploadMovie() {
    const file = videoUploadRef.current.files[0];
    
    // TODO: What extension should movies be?
    // TODO: Max file size?
    if (!file.type.includes('video') &&
      file.type !== 'video/avi' &&
      file.type !== 'video/mp4') {
      alert('Wrong video format');
    } else {
      const uploadMovieWorker = new MovieUploadWorker();
      uploadMovieWorker.onmessage = message => {
        const { data } = message;
        if (data.status === 'success' && data.progress) {
          updateProgress(() => data.progress);
        }
      };
      uploadMovieWorker.postMessage({
        file,
        movieName: "Mulan.avi",
        userUploaded: "434kata",
        url: API_URL + 'admin/movie/upload'
      });
      if (file.type !== 'video/mp4') {
        dispatch(
          updateUploadInfo(
            VIDEO_PREVIEW_ERROR,
            'Video will be uploaded, but preview is unavailable.You can only preview mp4 video format'));
      } else {
        dispatch(updateUploadInfo(VIDEO, URL.createObjectURL(file)));
      }
    }
  }
  
  function openUploadVideo(e) {
    e.preventDefault();
    videoUploadRef.current.click();
  }
  
  return (
    <MovieUploadBtn>
      {progress && <progress max={100} value={progress}/>}
      <Button text='Upload movie' onClick={openUploadVideo}/>
      <input type='file' hidden ref={videoUploadRef}/>
    </MovieUploadBtn>
  );
}
