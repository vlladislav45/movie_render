import styled from 'styled-components';
import { Button, ProfileImage } from 'components/basic';
import Logo from 'components/Logo';
import { ReactComponent as DarkModeIcon } from 'assets/icons/moon.svg';


export const StyledDrawerHeader = styled.div`
  position: relative;
  height: 180px;
  padding-top: 16px;
  padding-left: 16px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: min-content min-content auto auto;
`;

export const LoginButton = styled(Button)`
  grid-area: -1 / 1 / -1 / span 3;
  align-self: end;
  margin-bottom: 4px;
`
export const RegisterButton = styled(Button)`
  grid-area: -1 / 3 / -1 / span 3;
  align-self: end;
  margin-bottom: 4px;
`

export const DarkModeToggle = styled.span`
  grid-area: -1 / 4 / -1 / -1;
  align-self: start;
  
  display: flex;
  justify-self: center;
  align-items: center;
  min-width: 70px;
  width: 70px;
  justify-content: space-between;
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

export const MoonIcon = styled(DarkModeIcon)`
  width: 24px;
  height: 24px;
  
  ${({ $isDark, theme }) => $isDark && `
    & >.moon {
      fill: ${theme.onSurface};
      &.moonShadow {
        fill: ${theme.onSurface}AA;
      }
    }
    
    & >.stars {
      fill: ${theme.disabled};
    }
    
    & > .crescent {
      fill: ${theme.disabled};
      &.crescentDark {
        fill: ${theme.disabled}AA;
      }
    }
  `};
`;

export const DrawerLogo = styled(Logo)`
  position: absolute;
  top: 12px;
  right: 16px;
  width: 65%;
  height: 45%;
  ${({ $isLoggedIn }) => !$isLoggedIn && `
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
  `};
`;