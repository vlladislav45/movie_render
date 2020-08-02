import styled from 'styled-components';
import { Button, ProfileImage } from 'components/basic';


export const StyledDrawerHeader = styled.div`
  height: 150px;
  padding-top: 16px;
  padding-left: 16px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: min-content min-content min-content;
`;

export const LoginButton = styled(Button)`
  grid-area: 1 / 1 / 1 / span 3;
`
export const RegisterButton = styled(Button)`
  grid-area: 1 / 3 / 1 / span 3;
`

export const LogoutButton = styled(Button)`
  grid-area: 3 / 1 / 3 / -1;
`

export const DarkModeToggle = styled.span`
  grid-area: 3 / 5 / 3 / -1;
  display: flex;
  align-items: center;
`;

export const ProfilePhoto = styled(ProfileImage)``;

export const HeaderPrimaryText = styled.p`
  grid-area: 2 / 1 / 2 / -1;
  margin-top: 20px;
  font-size: 1.1rem;
  font-family: 'Lato', sans-serif;
  height: 36px;
  line-height: 36px;
  color: ${props => props.theme.onSurface};
`;

export const HeaderSecondaryText = styled.p`
  grid-area: 3 / 1 / 3 / -1;
  font-size: 0.9rem;
  font-family: 'Lato', sans-serif;
  height: 20px;
  line-height: 20px;
  color: ${props => props.theme.onSurfaceMD};
`;