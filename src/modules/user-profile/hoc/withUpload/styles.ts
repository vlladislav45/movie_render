import styled from 'styled-components';

export const PreviewImageModal = styled.div`
  position: relative;
  width: 20vmax;
  padding-top: 75%; // 4 : 3
`;

export const PreviewImage = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ActionsBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`;

export const WrongImageFormat = styled.p`
  font-size: 1.3rem;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.error};
  text-align: center;
  text-align: center;
`;