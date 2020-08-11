import React, { Fragment, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ProfileImage, Button } from 'components/basic';
import { updateUserData } from 'reducers/userReducer';
import { API_URL } from '../../../../api/BaseAPI';
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

  const [recentImagesModalOpen, setRecentImagesModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageError, setImageError] = useState('');
  const [uploadedImage, setUploadedImage] = useState();

  const { username, userImages } = useSelector(
    ({ auth: { loggedInUser } }) => ({
      username: loggedInUser.username,
      userImages: loggedInUser.userImages,
    }));

  useEffect(() => {
    if (inputRef.current)
      inputRef.current['addEventListener']('change', onUploadImage);

    return () => inputRef.current['removeEventListener']('change', onUploadImage);
  }, [inputRef.current]);

  function onUploadImage () {
    const file = inputRef.current['files'][0];
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
    inputRef.current['click']();
  }

  function uploadImage () {
    const fd = new FormData();
    const fileName = `image_${Math.random()}_${username}.jpg`;
    fd.append('file', uploadedImage, fileName);
    UserAPI.uploadImage(fd).then(res => {
      const { data } = res;
      if (data.error) {
        setImageError(data.error);
      } else {
        dispatch(enqueueSnackbarMessage(data.success));
        dispatch(
          updateUserData('photoUrl', { imageName: fileName }));
        setModalOpen(false);
      }
    });
  }

  return (
    <>
      <ProfilePictureContainer onClick={() => setRecentImagesModalOpen(true)}>
        <ProfileImage shape='rectangle'/>
      </ProfilePictureContainer>
      <UpdateImageButton
        onClick={openFileExplorer}
        type='text'
        color='secondary'
        text='update'
      />
      {/*{ReactDOM.createPortal(*/}
      {/*  <Modal isOpen={recentImagesModalOpen}*/}
      {/*         stateChanged={newState => setRecentImagesModalOpen(newState)}*/}
      {/*         closeOnClickOutside={!!imageError}*/}
      {/*  >*/}
      {/*    <>*/}
      {/*      <PreviewImageModal>*/}
      {/*        {userImages && userImages.map(({ imageName }) => (*/}
      {/*          <Fragment key={imageName}>*/}
      {/*            <PreviewImage*/}
      {/*              src={API_URL + 'user/' + username + '/' + imageName}*/}
      {/*              alt='preview image'/>*/}
      {/*          </Fragment>*/}
      {/*        ))}*/}
      {/*      </PreviewImageModal>*/}
      {/*      <ActionsBar>*/}
      {/*        <Button type='text' text='cancel'*/}
      {/*                onClick={() => setRecentImagesModalOpen(false)}/>*/}
      {/*        /!*<Button type='contained' text='confirm'*!/*/}
      {/*        /!*        onClick={uploadImage}/>*!/*/}
      {/*      </ActionsBar>*/}
      {/*    </>*/}
      {/*  </Modal>,*/}
      {/*  document.getElementById('modal'))}*/}


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
