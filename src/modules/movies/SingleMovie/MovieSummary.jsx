import React, { useState, useEffect, useRef } from 'react';
import useDeviceDimensions from '../../../hooks/useDeviceDimensions';
import { ReadMore, TextWrapper, StyledMovieSummary } from './styles';

const BIG_SUMMARY_THRESHOLD = 600;
const DEFAULT_TEXT = 'No summary available';
export default ({ summary = '' }) => {
  const [isExtended, setIsExtended] = useState(false);
  const [isBigText, setIsBigText] = useState(false);
  const [videoCoordinates, setVideoCoordinates] = useState({});

  const { width: deviceWidth } = useDeviceDimensions();

  useEffect(() => {
    calcExtendedSummaryOffset();
  }, [deviceWidth]);

  useEffect(() => {
    if (summary.length > BIG_SUMMARY_THRESHOLD) {
      setIsBigText(true);
    }
  }, [summary]);

  // For some reason refs give wrong dimensions
  // (my assumption is they get attached before the grid is properly rendered)
  function calcExtendedSummaryOffset () {
    const elem = document.getElementById('movie-video');
    const { width, height } = elem.getBoundingClientRect();
    setVideoCoordinates({ width, height });
  }

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
        {isBigText &&
          <ReadMore
            type='contained'
            onClickCapture={toggleSummary}
          >
            {isExtended ? 'Shrink' : 'Extend'}
          </ReadMore>
        }
        {summary}
      </TextWrapper>
    </StyledMovieSummary>
  );
}
