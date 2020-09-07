import styled from 'styled-components';
import { Button, Input } from 'components/basic';
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 200px);
  grid-template-rows: repeat(2, 250px);
  grid-gap: 15px;
`;

export const ProfilePictureContainer = styled.div`
  position: relative;
  grid-area: 1 / 1 / 2 / 2;
`;

export const ReadOnlyInfo = styled.div`
  grid-area: 2 / 1 / 2 / 1;
  display: flex;
  flex-direction: column;
`;

export const EditableInfo = styled.div`
  grid-area: 1 / 2 / 1 / 2;
  display: grid;
  grid-template-columns: min-content min-content;
  grid-template-rows: repeat(4, min-content);
  grid-row-gap: 15px;
  grid-column-gap: 15px;
  align-items: baseline;
`;


export const EditableInfoLabel = styled.div`
  grid-column: 1 / 1;
  white-space: nowrap;
  font-size: 1rem;
  font-family: 'Lato', sans-serif;
  color: ${props => props.theme.onSurfaceMD};
`;

export const EditableInfoValue = styled.div`
  grid-columns: 2 / 2;
  white-space: nowrap;
  font-size: 1rem;
  font-family: 'Lato', sans-serif;
  color: ${props => props.theme.onSurface};
  
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: all 100ms;
  &:hover {
    text-decoration-color: ${props => props.theme.onSurface};
  }
  &:hover svg {
    opacity: 1;
  }
`;

export const EditBtn = styled(EditIcon)`
  width: 18px;
  height: 18px;
  opacity: 0;
  transition: opacity 100ms;
  fill: ${props => props.theme.onSurface}
`;

export const DialogWrapper = styled.div`
  font-size: 1rem;
  width: 250px;
  display: flex;
  flex-direction: column;
`;

export const ErrorText = styled.div`
  width: 100%;
  text-align: center;
  color: ${p => p.theme.error};
`;

export const DialogInput = styled(Input)`
  margin: 10px 0;
`;

export const DialogButton = styled(Button)`
  align-self: flex-end;
`;