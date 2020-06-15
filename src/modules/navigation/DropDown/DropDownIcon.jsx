import React from 'react';
import { useSelector } from 'react-redux';
import { IconContainer } from './styles';

const DropDownIcon = ({ IconComponent }) => {
  const { color } = useSelector(({ themeReducer }) => ({
    color: themeReducer.themeColors.textColor,
  }));

  return (
    <IconContainer>
      <IconComponent style={{ fill: color }}/>
    </IconContainer>
  );
}

export default DropDownIcon;