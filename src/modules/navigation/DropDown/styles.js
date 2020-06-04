import styled from 'styled-components';

export const StyledDropDown = styled.div`
  position: absolute;
  top: -20%;
  right: 0;
  width: 30%;
  height: 20%;
  transition: all .7s;
  // z-index: -1;
  
  border: 1px solid #DEDEDE;
  box-shadow: 1px 1px 7px #666;
  
  ${props => props.isOpen && `top: 19%;`}
`;
