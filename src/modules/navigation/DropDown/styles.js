import styled from 'styled-components';
import { ThemedComponent } from 'components/basic';


export const StyledDropDown = styled(ThemedComponent)`
  position: absolute;
  top: -5%;
  right: 0px;
  width: 20%;
  min-width: 300px;
  transition: top .5s;
  transition-timing-function: cubic-bezier(.86,.1,.43,1.21);
  z-index: 10;
  
  ${props => props.isOpen && `top: ${props.topOffset}px;`}
`;

export const DropDownList = styled.ul``;

export const StyledDropDownItem = styled.li`
  width: 100%;
  border-bottom: 1px solid #33333344;
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
  font-size: 1.4rem;
  line-height: 1.2rem;
  font-family: 'Roboto', sans-serif;
  text-transform: capitalize;
  font-weight: 200;
`;

export const IconContainer = styled.span`
  padding-left: 15px;
`;
