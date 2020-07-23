import styled from 'styled-components';
import {
  transitionDurations,
  transitionFunctions,
} from 'config/animationConstants';
import { ThemedComponent } from '../basic';

export const StyledProfileButton = styled(ThemedComponent)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  padding: 10px;
`;

export const Username = styled.span`
  user-select: none;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  margin-left: 10px;
`;

export const ArrowIconContainer = styled.span`
  transition: transform ${transitionDurations.mediumCollapsing}ms ${transitionFunctions.deceleratedEasing};
  // transition-timing-function: cubic-bezier(.86,.1,.43,1.21);

  
  ${props => props.isFlipped && `
    transform: rotate(180deg);
    transition: transform ${transitionDurations.mediumExpand}ms ${transitionFunctions.acceleratedEasing};
  `}
  
  & > svg {
    width: 2.2rem;
    height: 2.2rem;
    fill: ${props => props.theme.secondary};
  }
`;
