import React from 'react';
import { LeadingIcon } from '../styles';
import { StyledTextButton } from './styles';

interface TextButtonProps {
  id: string,
  onClickCapture: () => void,
  disabled: boolean,
  color: string,
  withIcon: boolean,
  Icon?: React.ComponentClass,
  text: string,
  as: string,
}

const TextButton = (props: TextButtonProps) => {
  const { Icon, text, ...rest } = props;

  return (
    // @ts-ignore
    <StyledTextButton {...rest}>
      {!!Icon &&
      <LeadingIcon>
        {/* @ts-ignore */}
        <Icon/>
      </LeadingIcon>}
      {text}
    </StyledTextButton>
  );
};

export default TextButton;