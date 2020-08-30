import styled from 'styled-components';
import { Button } from 'components/basic';
import { ProfileImage } from 'components/basic';
import { getOverlay } from 'utils/colorUtils';


export const StyledProfilePicture = styled(ProfileImage)`
  object-fit: fill;
  cursor: pointer;
  border: 10px solid ${({ theme }) => getOverlay(theme.surface, theme.overlay,
  0.35)};
  border-radius: 5px;
`
