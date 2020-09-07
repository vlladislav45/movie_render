import React, { useCallback, useState } from 'react';
import useDeviceDimensions from 'hooks/useDeviceDimensions';
import { RateDialogAction, RateDialogActions, RateDialogInput, RateDialogTitle, RateDialogWrapper } from './styles';

interface RateDialogProps {
  title: string,
  onCancel: () => void,
  onConfirm: (review: string) => {},
}

const RateDialog = (props: RateDialogProps) => {
    const { device } = useDeviceDimensions();
    const [review, setReview] = useState<string>('');
    const onChange = useCallback((e: MouseEvent) => {
      // @ts-ignore
      setReview(e.target.value);
    }, []);

    function handleClick() {
      props.onConfirm(review);
    }

    return (
      //@ts-ignore
      <RateDialogWrapper $device={device}>
        <RateDialogTitle>{props.title}</RateDialogTitle>
        {/*@ts-ignore*/}
        <RateDialogInput inputType='textarea' onChange={onChange} withCharacterCount
                         label='Add review'
                         helperText='Review text is optional'/>
        <RateDialogActions>
          {/*@ts-ignore*/}
          <RateDialogAction type='text' onClick={props.onCancel}>Cancel</RateDialogAction>
          {/*// @ts-ignore*/}
          <RateDialogAction type='contained' onClick={handleClick}>Confirm</RateDialogAction>
        </RateDialogActions>
      </RateDialogWrapper>
    );
  }
;

export default RateDialog;