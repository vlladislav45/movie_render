import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { addRipple } from 'utils/rippleUtils';
import { StyledDropDownItem, DropDownText, IconContainer } from './styles';


export const MenuItem = ({ name, onClick, icon: Icon, isActive, to, ...rest }) => {
  const ref = useRef();
  useEffect(() => {
    if (!ref || !ref.current) return;
    addRipple(ref.current);
  }, [ref])
  
  const props = {
    ref: ref,
    className: 'menuItem',
    onClick: onClick,
    $rippleColor: 'secondary',
    as: Link,
    $isActive: isActive,
    focusable: true,
    to,
    ...rest,
  }
  
  return (
    <StyledDropDownItem
      {...props}
    >
      {Icon && (
        <IconContainer>
          <Icon/>
        </IconContainer>
      )}
      <DropDownText>
        {name}
      </DropDownText>
    </StyledDropDownItem>
  );
}

export default MenuItem;
