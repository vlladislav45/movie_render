import React from 'react';
import { StyledSubTitle, StyledTitle, TitleContainer } from './styles';

const Title = props => {

  return (
    <TitleContainer
      {...props}
    >
      <StyledTitle>
        Глейдате онлайн филми
      </StyledTitle>
      {/*<StyledSubTitle>*/}
      {/*  Регистрирайте се и усетете максимално удоволствие*/}
      {/*</StyledSubTitle>*/}
    </TitleContainer>
  );
};

export default Title;