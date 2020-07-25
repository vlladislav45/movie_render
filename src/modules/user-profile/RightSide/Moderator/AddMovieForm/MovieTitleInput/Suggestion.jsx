import React from 'react';
import withRipple from 'HOC/withRipple';
import { SuggestionItem } from './styles';

const Suggestion = props => {
  const { title, id, handleClick } = props;

  function loadSuggestionData () {
    handleClick(id);
  }

  return (
    <SuggestionItem
      tag='li'
      onClick={loadSuggestionData}>
      {title}
    </SuggestionItem>
  );
};

export default withRipple(Suggestion);
