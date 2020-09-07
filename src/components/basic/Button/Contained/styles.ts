import styled from 'styled-components';
import { ACTIVE_RIPPLE_CLASS } from 'components/Styled/BaseRipple';
import { applyShadow, getOverlay } from 'utils/colorUtils';
import { BaseButton } from '../styles';

interface ContainedButtonProps {
  theme : object,
  color : string,
  disabled : boolean
}
export const StyledContainedButton = styled(BaseButton)<Pick<ContainedButtonProps, any>>`${props => {
  const { theme, color, disabled } = props;
  
  const textColor = theme[`on${color!.charAt(0).toUpperCase() + color!.slice(1)}`];
  const backgroundColor = theme[color!];

  return `
    box-shadow: ${applyShadow(2)};
    background: ${backgroundColor};
    color: ${textColor};
    
    &:hover:not(:disabled):before {
      opacity: 0.08;
      background: ${theme.overlay};
    }
    
    &:hover:not(:disabled) {
      box-shadow: ${applyShadow(4)};
    }
    
    &:focus, &:active {
      background: ${getOverlay(backgroundColor, theme.overlay, 0.24)};
    }
    
    &:after {
      background: ${theme.overlay};
    }
    
    ${disabled && `
        box-shadow: none;
        background: ${theme.disabled};
        // color: ${getOverlay(textColor, '#FFFFFF', 0.18)};
        cursor: default;
    `};
    
    &.${ACTIVE_RIPPLE_CLASS} {
        box-shadow: ${applyShadow(6)};
    };
    
    & svg {
      fill: ${textColor};
    }
`;
}}`;
StyledContainedButton.displayName = 'ContainedButton';