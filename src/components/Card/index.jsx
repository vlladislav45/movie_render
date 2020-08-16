import React from 'react';
import { CardWrapper } from './styles';

const Card = ({ children, ...rest }) => {
  return (
    <CardWrapper
      elevation={6}
      {...rest}
    >
      {children}
    </CardWrapper>
  );
};

export default Card;