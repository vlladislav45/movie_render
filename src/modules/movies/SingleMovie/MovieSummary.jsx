import React, { useState, useEffect } from 'react';
import { ReadMore, SingleMovieWrapper, StyledMovieSummary } from './styles';

const MAX_LENGTH = 600;
const DEFAULT_TEXT = 'No summary available';
export default ({ summary = '' }) => {
  const [isExtended, setIsExtended] = useState(false);
  const [text, setText] = useState(summary);
  const [isOverflow, setIsOverflow] = useState(false);

  const truncate = () => summary.slice(0, MAX_LENGTH).concat('... ');

  useEffect(() => {
    if (summary.length > MAX_LENGTH) {
      setIsOverflow(true);
      setText(truncate());
    } else if (summary.length === 0) {
      setIsOverflow(false);
      setText(DEFAULT_TEXT);
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
    setIsExtended(!isExtended);
  }


  return (
    <>
      <StyledMovieSummary
        isExtended={isExtended}
      >
        {text}
      </StyledMovieSummary>
      {isOverflow &&
        <ReadMore
          onClick={toggleSummary}
          isExtended={isExtended}
        >
          {isExtended ? 'Hide' : 'Read more'}
        </ReadMore>
      }
    </>
  );
}
