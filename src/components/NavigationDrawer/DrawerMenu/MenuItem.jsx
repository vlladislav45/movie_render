import React from 'react';
import { StyledDropDownItem, DropDownText, IconContainer } from './styles';
import withRipple from 'HOC/withRipple';


const ItemWithRipple = withRipple(StyledDropDownItem);
export const MenuItem = ({ name, onClick, icon: Icon, isActive, ...rest }) => (
  <ItemWithRipple
    focusable
    className='menuItem'
    onClick={onClick}
    // rippleColor='secondary'
    rippleColor={isActive ? 'secondary' : 'contrast'}
    rippleSize='m'
    tag='li'
    $isActive={isActive}
    style={{
      borderRadius: '6px',
      margin: '4px 0',
    }}
    {...rest}
  >
    {Icon && (
      <IconContainer>
        <Icon/>
      </IconContainer>
    )}
    <DropDownText>
      {name}
    </DropDownText>
  </ItemWithRipple>
);

export default MenuItem;
