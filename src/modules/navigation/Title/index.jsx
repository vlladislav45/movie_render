import React from 'react';
import useDeviceDimensions from 'hooks/useDeviceDimensions';
import { StyledSubTitle, StyledTitle, TitleContainer } from './styles';

const Title = props => {
  const { device } = useDeviceDimensions();
  return (
    <TitleContainer
      {...props}
    >
      <StyledTitle device={device}>
        Гледайте онлайн филми
      </StyledTitle>
      {/*<StyledSubTitle>*/}
      {/*  Регистрирайте се и усетете максимално удоволствие*/}
      {/*</StyledSubTitle>*/}
    </TitleContainer>
  );
};

export default Title;