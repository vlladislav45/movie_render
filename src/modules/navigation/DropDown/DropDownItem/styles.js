import styled from 'styled-components';

export const StyledDropDownItem = styled.li`
  width: 100%;
  border-bottom: 1px solid #33333344;
  padding: 10px 0;
  text-align: center;
  cursor: pointer;
  
  &:hover {
    background: ${props => props.theme.primary}44;
  }
`;
