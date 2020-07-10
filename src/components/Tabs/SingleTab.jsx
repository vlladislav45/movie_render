import withRipple from 'HOC/withRipple';
import React from 'react';
import { StyledSingleTab } from './styles';

const SingleTab = React.forwardRef((props, ref) => {
  const { tabName, onClick = () => {}, ...rest } = props;

  function handleClick () {
    onClick(tabName);
  }

  return (
    <StyledSingleTab
      {...rest}
      ref={ref}
      onClick={handleClick}
    >
      {tabName}
    </StyledSingleTab>
  );
});

export default withRipple(SingleTab);
