import React from 'react';
import { Button } from 'components/basic';
import { ActionsBar, PreviewImage, PreviewImageModal, WrongImageFormat } from './styles';

interface DialogContentProps {
  error?: string | null,
  uploadedFile?: Blob | null,
  onConfirm?: () => void,
  onCancel: () => void
}
const DialogContent = (props :DialogContentProps) => {
  const { error, uploadedFile, onConfirm, onCancel } = props;
  return (
    <>
      {error
        ? <WrongImageFormat>{error}</WrongImageFormat>
        : (
          <>
            <PreviewImageModal>
              <PreviewImage
                //@ts-ignore
                src={uploadedFile
                  ? URL.createObjectURL(uploadedFile)
                  : null}
                alt='preview image'/>
            </PreviewImageModal>
            <ActionsBar>
              <Button
                // @ts-ignore
                type='text'
                text='cancel'
                onClick={onCancel}
              />
              <Button
                // @ts-ignore
                type='contained'
                text='confirm'
                onClick={onConfirm}
              />
            </ActionsBar>
          </>
        )}
    </>
  );
};

export default DialogContent;