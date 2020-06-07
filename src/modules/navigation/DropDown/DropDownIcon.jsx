import React from 'react';
import { useSelector } from 'react-redux';

const DropDownIcon = ({ IconComponent }) => {
  const { color } = useSelector(({ themeReducer }) => ({
    color: themeReducer.themeColors.primary,
  }));

  return (
    <IconComponent style={{ fill: color }}/>
  );
}

export default DropDownIcon;