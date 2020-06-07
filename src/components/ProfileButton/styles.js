import styled from 'styled-components';
import { ThemedComponent } from '../basic';

export const StyledProfileButton = styled(ThemedComponent)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  padding: 10px;
`;

export const Username = styled.span`
  font-size: 1.1rem;
  font-family: 'Roboto', sans-serif;
`;

export const ArrowIconContainer = styled.span`
  
  transform: rotate(180deg);
`;
