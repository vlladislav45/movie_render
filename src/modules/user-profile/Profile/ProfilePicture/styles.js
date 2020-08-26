import styled from 'styled-components';
import { Button } from 'components/basic';
import { ProfileImage } from 'components/basic';
import { getOverlay } from 'utils/colorUtils';

export const ProfilePictureContainer = styled.div`
  // grid-area: 1 / 1 / 1 / 1;
  position: relative;
  // min-width: 150px;
  padding-top: 75%;
  cursor: pointer;

  border: 10px solid ${({ theme }) => getOverlay(theme.surface, theme.overlay,
  0.35)};
  border-radius: 5px;
`;

export const StyledProfilePicture = styled(ProfileImage)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%!important;
  height: 100%!important;
  object-fit: fill;
`

export const UpdateImageButton = styled(Button)`
  grid-area: 2 / 1 / 2 / 2;
  justify-self: center;
`;

