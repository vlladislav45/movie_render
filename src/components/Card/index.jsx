import React from 'react';
import { CardWrapper } from './styles';

const Card = ({ children, ...rest }) => {
  return (
    <CardWrapper
      {...rest}
    >
      {children}
    </CardWrapper>
  );
};

export default Card;