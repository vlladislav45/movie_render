import React from 'react';
import DropDownIcon from './DropDownIcon';
import { StyledDropDownItem, DropDownText } from './styles';


export const DropDownItem = ({ element: { name, onClick, icon } }) => {

  return (
    <StyledDropDownItem onClick={onClick}>
      {icon && <DropDownIcon IconComponent={icon}/>}
      <DropDownText>
        {name}
      </DropDownText>
    </StyledDropDownItem>
  );
};

export default DropDownItem;