import React from 'react';
import DropDownIcon from './DropDownIcon';
import { DropDownText, StyledDropDownItem } from './styles';


export const DropDownItem = ({ element: { name, onClick, icon } }) => (
  <StyledDropDownItem onClick={onClick}>
    {icon && <DropDownIcon IconComponent={icon}/>}
    <DropDownText>
      {name}
    </DropDownText>
  </StyledDropDownItem>
);

export default DropDownItem;