import React, { useState, useEffect, useRef } from 'react';
import useDeviceDimensions from '../../../hooks/useDeviceDimensions';
import { ReadMore, TextWrapper, StyledMovieSummary } from './styles';

const MAX_LENGTH = 6000;
const DEFAULT_TEXT = 'No summary available';
export default ({ summary = '' }) => {
  const [isExtended, setIsExtended] = useState(false);
  const [text, setText] = useState(summary);
  const [isOverflow, setIsOverflow] = useState(false);
  const [videoCoordinates, setVideoCoordinates] = useState({});
  const truncate = () => summary.slice(0, MAX_LENGTH).concat('... ');

  const { device, width: deviceWidth } = useDeviceDimensions();

  // For some reason refs give wrong dimensions
  // (my assumption is they get attached before the grid is properly rendered)
  function calcExtendedSummaryOffset () {
    // alert('tuk')
    const elem = document.getElementById('movie-video');
    const { width, height } = elem.getBoundingClientRect();
    // alert(width)
    setVideoCoordinates({ width, height });
  }

  useEffect(() => {
   calcExtendedSummaryOffset();
  }, [device, deviceWidth]);

  useEffect(() => {
    if (summary.length > MAX_LENGTH) {
      setIsOverflow(true);
      setText(truncate());
    } else if (summary.length === 0) {
      setIsOverflow(false);
    } else {
      setIsOverflow(false);
    }
  }, [summary]);

  useEffect(() => {
    if (isExtended)
      setText(summary);
    else if (!isExtended && isOverflow)
      setText(truncate());
  }, [isExtended]);

  function toggleSummary () {
    calcExtendedSummaryOffset();
    setIsExtended(!isExtended);
  }

  const isEmpty = summary.length === 0;

  return (
    <StyledMovieSummary
      isExtended={isExtended}
      videoCoordinates={videoCoordinates}
    >
      {!isExtended && <h2 id='title'>{isEmpty ? DEFAULT_TEXT : `Summary:`}</h2>}
      <TextWrapper
        videoCoordinates={videoCoordinates}
        isExtended={isExtended}
      >
        {text}
      </TextWrapper>
      {isOverflow &&
        <ReadMore
          type='text'
          onClickCapture={toggleSummary}
        >
          {isExtended ? 'Hide' : 'Read more'}
        </ReadMore>
      }
    </StyledMovieSummary>
  );
}
