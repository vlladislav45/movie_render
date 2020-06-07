import styled from 'styled-components';


export const StyledDropDown = styled.div`
  position: absolute;
  top: -10%;
  right: 5px;
  width: 30%;
  height: 20%;
  min-width: 400px;
  min-height: 200px;
  transition: all .4s;
  transition-timing-function: cubic-bezier(.86,.1,.43,1.21);
  
  z-index: -1;
  
  border: 1px solid #DEDEDE;
  box-shadow: 1px 1px 7px #666;
  
  ${props => props.isOpen && `top: ${props.topOffset}px;`}
`;

export const DropDownList = styled.ul``;