import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { closeDialog, enqueueSnackbarMessage, openDialog } from 'reducers/uiReducer';
import { updateUserData } from 'reducers/userReducer';
import DialogContent from './DialogContent';

enum ErrorType {
  NOT_SUPPORTED_EXTENSIONS = 'Not supported extension'
}

interface Store {
  auth: { loggedInUser: { username:string, userId:string } }
}
const selector = createSelector(
  (store : Store) => store.auth.loggedInUser.username,
  username => username
)
const WithUpload =
  (supportedExtensions: Array<string>, uploadApiFunction: (formData: FormData) => Promise<any>) =>
    (Component: React.ComponentClass<{ toggleFileUpload: () => void }>) =>
      function InnerComponent(props: any) {
        const dispatch = useDispatch();
        const username = useSelector(selector);
        const [uploadedFile, setUploadedFile] = useState<Blob | null>(null);


        const openInput = useCallback(() => {
          const input = document.getElementById('file_input_id');
          if (!input) return;
          input.click();
        }, []);

        const closePreview = useCallback(() => dispatch(closeDialog()), []);

        const onChange = useCallback(e => {
          const file: File = e.target.files[0];

          const onConfirm = () => {
            confirmUpload(file);
          }

          if (supportedExtensions.includes(file.type)) {
            setUploadedFile(() => file);
            dispatch(openDialog(<DialogContent
              onCancel={closePreview}
              onConfirm={onConfirm}
              uploadedFile={file}/>));
          } else {
            setUploadedFile(() => null);
            dispatch(openDialog(<DialogContent
              error={ErrorType.NOT_SUPPORTED_EXTENSIONS}
              onCancel={closePreview}/>));
          }
          e.target.value = null;
        }, []);

        const confirmUpload = useCallback((fileToUpload :Blob) => {
          const fd = new FormData();
          const fileName = `image_${Math.random()}_${username}.jpg`;


          fd.append('file', fileToUpload, fileName);
          uploadApiFunction(fd).then(({ data }) => {
            if (data.error) {
              alert('ERROR, see console');
              console.group('Upload Error');
              console.log(data.error);
              console.groupEnd();
            } else {
              // @ts-ignore
              dispatch(enqueueSnackbarMessage(data.success));
              dispatch(updateUserData('photoUrl', { imageName: fileName }));
              closePreview();
            }
          });
        }, [uploadedFile]);

        return (
          <>
            {ReactDOM.createPortal(
              <input id='file_input_id' type='file' onChange={onChange} hidden/>,
              document.body)}
            <Component {...props} toggleFileUpload={openInput}/>
          </>
        );
      };

export default WithUpload;