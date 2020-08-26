import React, {useCallback, useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import {useDispatch} from 'react-redux';
import {enqueueSnackbarMessage} from 'reducers/uiReducer';
import {Modal, Button} from 'components/basic';
import {updateUserData} from 'reducers/userReducer';
import {ActionsBar, PreviewImage, PreviewImageModal, WrongImageFormat} from './styles';

enum ErrorType {
    NOT_SUPPORTED_EXTENSIONS = 'Not supported extension'
}

/**
 * Hook that needs onConfirm and supportedExtensions encapsulates logic for opening preview modal
 * @param supportedExtensions array with supported extensions
 * @param uploadApiFunction function that calls the api for upload
 * @returns onChange listener to be attached to an input
 */
const useUploadWithPreview = (supportedExtensions: Array<string>, uploadApiFunction: (formData: FormData) => Promise<any>) => {
    const dispatch = useDispatch();
    const [error, setError] = useState<string | null>(null);
    const [uploadedFile, setUploadedFile] = useState<Blob | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const openInput = useCallback(() => {
        const input = document.getElementById('file_input_id');
        if (!input) return;
        input.click();
    }, [])

    const onChange = useCallback(e => {
        const file: File = e.target.files[0];
        setError(null);
        setUploadedFile(null);
        if (supportedExtensions.includes(file.type)) {
            setUploadedFile(file);
        } else {
            setError(ErrorType.NOT_SUPPORTED_EXTENSIONS)
        }
    }, [])

    const toggleModal = useCallback(newState => setModalOpen(oldState => newState || !oldState), [])
    const confirmUpload = useCallback(() => {
        const fd = new FormData();
        const fileName = `image_${Math.random()}_.jpg`;
        // const fileName = `image_${Math.random()}_${username}.jpg`;
        // @ts-ignore
        fd.append('file', uploadedFile, fileName);
        uploadApiFunction(fd).then(res => {
            const {data} = res;
            if (data.error) {
                setError(data.error);
            } else {
                // @ts-ignore
                dispatch(enqueueSnackbarMessage(data.success));
                dispatch(
                    updateUserData('photoUrl', {imageName: fileName}));
                toggleModal(false);
            }
        });
    }, [uploadedFile])

    useEffect(() => {
        const root = document.getElementById('root');

        if (!root) return;

        ReactDOM.createPortal(
            <input id='file_input_id' type='file' onChange={onChange} hidden/>,
            document.body)
    }, [])


    useEffect(() => {
        if (!uploadedFile || !error) return;
        const modalsContainer: HTMLElement | null = document.getElementById('modal');
        if (modalsContainer === null) return;
        ReactDOM.createPortal(
            // @ts-ignore
            <Modal isOpen={modalOpen}
                   stateChanged={toggleModal}
            >
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
                                    onClick={toggleModal}
                                />
                                <Button
                                    // @ts-ignore
                                    type='contained'
                                    text='confirm'
                                    onClick={confirmUpload}
                                />
                            </ActionsBar>
                        </>
                    )}
            </Modal>,
            modalsContainer)
    }, [uploadedFile, error])


    return [openInput];
};

export default useUploadWithPreview;