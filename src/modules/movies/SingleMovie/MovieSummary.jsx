import React, { useState, useEffect, useRef } from 'react';
import useDeviceDimensions from 'hooks/useDeviceDimensions';
import { TextWrapper, StyledMovieSummary, CardTitle } from './styles';

const BIG_SUMMARY_THRESHOLD = 600;
const DEFAULT_TEXT = 'No summary available';
export default ({ summary = '' }) => {
  
  const isEmpty = summary.length === 0;

  return (
    <StyledMovieSummary
    >
      <CardTitle>{isEmpty ? DEFAULT_TEXT : `Summary:`}</CardTitle>
      <TextWrapper>
        {summary}
      </TextWrapper>
    </StyledMovieSummary>
  );
}
