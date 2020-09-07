import React from 'react';
import { LeadingIcon } from '../styles';
import { StyledContainedButton } from './styles';

interface ContainedButtonProps {
  id: string,
  onClickCapture: () => void,
  disabled: boolean,
  color: string,
  withIcon: boolean,
  Icon? : React.ComponentClass,
  text : string,
  as: string,
}
const ContainedButton = (props :ContainedButtonProps) => {
  const { Icon, text } = props;
  return (
    // @ts-ignore
    <StyledContainedButton {...props}>
      {Icon &&
      <LeadingIcon>
        {/* @ts-ignore */}
        <Icon/>
      </LeadingIcon>}
      {text}
    </StyledContainedButton>
  );
};

export default React.memo(ContainedButton);