import styled from 'styled-components';
import { MaterialSurface } from 'components/basic';

export const ErrorPageWrapper = styled(MaterialSurface)`
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.surface};
  width: 400px;
  height: 200px;
  margin: auto;
`;

export const ErrorTitle = styled.h2`
  font-size: 1.4rem;
  color: ${props => props.theme.error};
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 12px;
  margin-top: 12px;
`;
export const ErrorMessage = styled.p`
  font-size: 1.1rem;
  width: 100%;
  text-align: center;
  color: ${props => props.theme.error};
`;