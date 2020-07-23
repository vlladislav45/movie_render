import styled from 'styled-components';
import { Button } from 'components/basic';
import { getOverlay } from 'utils/colorUtils';

export const ProfilePictureContainer = styled.div`
  grid-area: 1 / 1 / 1 / 1;
  position: relative;
  min-width: 150px;
  padding-top: 75%;
  
  & > img {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%!important;
    height: 100%!important;
    object-fit: cover;
  }
  
  border: 10px solid ${({ theme }) => getOverlay(theme.surface, theme.overlay,
  0.35)};
  border-radius: 5px;
`;

export const UpdateImageButton = styled(Button)`
  grid-area: 2 / 1 / 2 / 2;
  justify-self: center;
`;

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
`;
