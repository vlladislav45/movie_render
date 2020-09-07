import styled from 'styled-components';
import { BaseButton } from '../styles';

interface TextButtonProps {
  theme : object,
  color : string,
  disabled : boolean,
}
export const StyledTextButton = styled(BaseButton)<Pick<TextButtonProps, any>>`${props => {
  const { color: themeColor = 'primary', theme, disabled } = props;
  const textColor = theme[themeColor];

  return `
    & svg {
      fill: ${textColor};
    };
    
    color: ${textColor};
    position: relative;
    
    &:hover:not(:disabled):before {
      background: ${textColor};
      opacity: 0.04;
    }
    
    &:after {
      background: ${textColor};
    }
    
    &:focus, &:active {
      background: ${textColor}25;
    }
    
    ${disabled && `
      color: ${theme.disabled};
      cursor: default;
    `}
    
    
    & svg {
      fill: ${textColor};
    }
  `;
}}
`;
// @ts-ignore
StyledTextButton.dispalyName = 'TextButton';