import styled from 'styled-components';
import { ThemedComponent } from 'components/basic';
import { VERY_HIGH_Z_INDEX } from 'config/zIndexes';
import { applyShadow } from 'utils/colorUtils';

export const StyledDropDown = styled.div`
  position: absolute;
  top: -5%;
  right: 0;
  width: 20%;
  min-width: 300px;
  transition: top .5s;
  transition-timing-function: cubic-bezier(.86,.1,.43,1.21);
  box-shadow: ${applyShadow(16)};
  background: ${props => props.theme.surface};
  // 1 less than TopNavBar
  z-index: ${VERY_HIGH_Z_INDEX - 1};
  
  ${props => props.isOpen && `top: ${props.topOffset}px;`}
`;

export const DropDownList = styled.ul``;

export const StyledDropDownItem = styled(ThemedComponent)`
  width: 100%;
  border-bottom: 1px solid ${({ theme: { isDark, disabled, surface } }) => isDark
  ? surface
  : disabled};
  background-color: transparent;
  padding: 10px 0;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background: ${props => props.theme.primary}44;
  }
`;

export const DropDownText = styled.span`
  padding-left: 30px;
  font-size: 1rem;
  line-height: 1.2rem;
  font-family: 'Roboto', sans-serif;
  text-transform: capitalize;
  font-weight: 200;
  user-select: none;
`;

export const IconContainer = styled.span`
  padding-left: 15px;
`;
