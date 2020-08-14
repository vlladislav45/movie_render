import React, { useState, useEffect, useRef } from 'react';
import useDeviceDimensions from 'hooks/useDeviceDimensions';
import { SummaryCard, StyledMovieSummary, CardTitle } from './styles';

const BIG_SUMMARY_THRESHOLD = 600;
const DEFAULT_TEXT = 'No summary available';
export default ({ summary = '', oneColumn }) => {
  
  const isEmpty = summary.length === 0;

  return (
    <StyledMovieSummary
      $oneColumn={oneColumn}
    >
      <CardTitle>{isEmpty ? DEFAULT_TEXT : `Summary:`}</CardTitle>
      <SummaryCard>
        {summary}
      </SummaryCard>
    </StyledMovieSummary>
  );
}
