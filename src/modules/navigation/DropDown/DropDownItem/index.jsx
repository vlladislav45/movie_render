import React from 'react';
import DropDownIcon from '../DropDownIcon';
import { StyledDropDownItem } from './styles';


export const DropDownItem = ({ element: { name, onClick, icon } }) => {

  return (
    <StyledDropDownItem onClick={onClick}>
      {icon && <DropDownIcon IconComponent={icon}/>}
      {name}
    </StyledDropDownItem>
  );
};

export default DropDownItem;