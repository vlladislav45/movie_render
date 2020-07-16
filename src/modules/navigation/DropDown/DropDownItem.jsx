import React from 'react';
import withRipple from 'HOC/withRipple';
import DropDownIcon from './DropDownIcon';
import { DropDownText, StyledDropDownItem } from './styles';

const ItemWithRipple = withRipple(StyledDropDownItem);
export const DropDownItem = ({ element: { name, onClick, icon }, ...rest }) => (
  <ItemWithRipple
    onClick={onClick}
    rippleColor='primary'
    rippleSize='m'
    tag='li'
    {...rest}
  >
    {icon && <DropDownIcon IconComponent={icon}/>}
    <DropDownText>
      {name}
    </DropDownText>
  </ItemWithRipple>
);

export default DropDownItem;
