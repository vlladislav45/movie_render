import styled from 'styled-components';
import { Button } from 'components/basic';
import { getOverlay } from 'utils/colorUtils';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(min-content, 1fr));
  grid-template-rows: repeat(6, min-content);
  grid-gap: 10px;
  width: 100%;
  height: 100%;
`;

export const BaseInfo = styled.div`
  grid-area: 1 / 2 / span 1 / span 2;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const BaseInfoLine = styled.div`
  text-align: left;
  font-size: 1.2rem;
  font-family: 'Lobster', cursive;
  color: ${props => props.theme.secondary};
`;
