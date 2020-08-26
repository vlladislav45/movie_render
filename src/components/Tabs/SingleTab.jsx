import React from 'react';
import { addRipple } from 'utils/rippleUtils';
import { StyledSingleTab } from './styles';

const SingleTab = React.forwardRef((props, ref) => {
  const { tabName, onClick = () => {}, denserRipple: denseRipple, rippleColor, ...rest } = props;
  
  React.useEffect(() => {
    if (!ref.current) return;
    addRipple(ref.current)
  }, [ref])

  function handleClick () {
    onClick(tabName);
  }

  return (
    <StyledSingleTab
      {...rest}
      ref={ref}
      onClick={handleClick}
      $rippleColor={rippleColor}
      $denseRipple={denseRipple}
    >
      {tabName}
    </StyledSingleTab>
  );
});

export default SingleTab;
