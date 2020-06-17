import React from 'react';
import DropDownIcon from './DropDownIcon';
import { DropDownText, StyledDropDownItem } from './styles';

export const DropDownItem = ({ element: { name, onClick, icon }, ...rest }) => (
  <StyledDropDownItem onClick={onClick} withRipple
                      rippleColor='primary' {...rest}>
    {icon && <DropDownIcon IconComponent={icon}/>}
    <DropDownText>
      {name}
    </DropDownText>
  </StyledDropDownItem>
);

export default DropDownItem;
