import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { Modal, ProfileImage, Button } from 'components/basic';
import { updateUserData } from 'reducers/userReducer';
import UserAPI from '../../../../api/UserAPI';
import { enqueueSnackbarMessage } from '../../../../reducers/uiReducer';
import {
  PreviewImage,
  PreviewImageModal,
  ProfilePictureContainer,
  UpdateImageButton,
  ActionsBar, WrongImageFormat,
} from './styles';

const ProfilePicture = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();

  const [modalOpen, setModalOpen] = useState(false);
  const [imageError, setImageError] = useState('');
  const [uploadedImage, setUploadedImage] = useState();

  useEffect(() => {
    if (inputRef.current)
      inputRef.current.addEventListener('change', onUploadImage);

    return () => inputRef.current.removeEventListener('change', onUploadImage);
  }, [inputRef.current]);

  function onUploadImage () {
    const file = inputRef.current.files[0];
    setImageError(null);
    setUploadedImage(null);

    //TODO: All supported filed
    if (file.type !== 'image/jpeg' && file.type !== 'image/png')
      setImageError('Unsupported file extension');
    else
      setUploadedImage(file);

    setModalOpen(true);
  }

  function openFileExplorer () {
    inputRef.current.click();
  }

  function uploadImage () {
    const fd = new FormData();
    const FAKE_USERNAME = 'kopa4a';
    fd.append('file', uploadedImage, `image_${Math.random()}_${FAKE_USERNAME}.jpg`);
    UserAPI.uploadImage(fd).then(res => {
      const { data } = res;
      if (data.error) {
        setImageError(data.error);
      } else {
        dispatch(enqueueSnackbarMessage(data.success));
        dispatch(
          updateUserData('photoUrl', URL.createObjectURL(uploadedImage)));
        setModalOpen(false);
      }
    });
  }

  return (
    <>
      <ProfilePictureContainer>
        <ProfileImage shape='rectangle'/>
      </ProfilePictureContainer>
      <UpdateImageButton
        onClick={openFileExplorer}
        type='text'
        color='secondary'
        text='update'
      />
      {ReactDOM.createPortal(
        <Modal isOpen={modalOpen}
               stateChanged={newState => setModalOpen(newState)}
               closeOnClickOutside={!!imageError}
        >
          {imageError
            ? <WrongImageFormat>{imageError}</WrongImageFormat>
            : (
              <>
                <PreviewImageModal>
                  <PreviewImage
                    src={uploadedImage
                      ? URL.createObjectURL(uploadedImage)
                      : null}
                    alt='preview image'/>
                </PreviewImageModal>
                <ActionsBar>
                  <Button type='text' text='cancel'
                          onClick={() => setModalOpen(false)}/>
                  <Button type='contained' text='confirm'
                          onClick={uploadImage}/>
                </ActionsBar>
              </>
            )}
        </Modal>,
        document.getElementById('modal'))}
      <input ref={inputRef} type='file' hidden/>
    </>
  );
};

export default ProfilePicture;
