import styled from 'styled-components';
import { WithRipple } from 'components/Styled/BaseRipple';

/**
 * To maintain 16px padding from start of drawer to the icon (not the start of the item)
 * put 8px padding in items and 8px from icon to start of item
 */
export const MenuItems = styled.ul`
  margin: 8px 0;
  padding: 0 8px;
`;

export const MenuItemTitle = styled.p`
  color: ${props => props.theme.onSurfaceMD};
  padding: 20px 4px;
`;

export const StyledDropDownItem = styled(WithRipple)`
  padding: 10px 0;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 48px;
  border-radius: 6px;
  margin: 4px 0;
  
  fill: ${props => props.theme.onSurface};
  color: ${props => props.theme.onSurface};
  ${props => props.$isActive && `
    background: ${props.theme.secondary}30;
    color: ${props.theme.secondary};
    fill: ${props.theme.secondary}
  `};

`;

export const DropDownText = styled.span`
  padding: 10px 0;
  padding-left: 16px;
  font-size: 1rem;
  line-height: 1.1rem;
  font-family: 'Roboto', sans-serif;
  text-transform: capitalize;
  font-weight: 400;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
`;

export const IconContainer = styled.span`
  padding-left: 8px;
  pointer-events: none;
`;
