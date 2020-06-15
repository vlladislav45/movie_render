import React from 'react';
import { StyledFilledInput, StyledFilledInputContainer } from './styles';

export default React.forwardRef(({ label, ...rest },
  ref) => {

  return (
    <StyledFilledInputContainer>
      {/*<StyledFilledInputLabel>*/}
      {/*</StyledFilledInputLabel>*/}
      <StyledFilledInput ref={ref} {...rest}/>
    </StyledFilledInputContainer>
  );
});