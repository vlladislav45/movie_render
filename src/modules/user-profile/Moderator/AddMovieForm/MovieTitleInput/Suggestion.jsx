import React from 'react';
import withRipple from 'HOC/withRipple';
import { SuggestionItem } from './styles';

const Suggestion = props => {
  const { title, id, handleClick, ...rest } = props;

  function loadSuggestionData () {
    handleClick(id);
  }

  return (
    <SuggestionItem
      onClick={loadSuggestionData}
      {...rest}
    >
      {title}
    </SuggestionItem>
  );
};

export default withRipple(Suggestion);
