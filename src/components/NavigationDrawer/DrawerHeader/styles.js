import styled from 'styled-components';
import { Button, ProfileImage } from 'components/basic';
import { ReactComponent as DarkModeIcon } from 'assets/icons/moon.svg';


export const StyledDrawerHeader = styled.div`
  height: 180px;
  padding-top: 16px;
  padding-left: 16px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: min-content min-content min-content auto;
`;

export const LoginButton = styled(Button)`
  grid-area: 1 / 1 / 1 / span 3;
`
export const RegisterButton = styled(Button)`
  grid-area: 1 / 3 / 1 / span 3;
`

export const DarkModeToggle = styled.span`
  grid-area: 4 / 3 / 4 / -2;
  display: flex;
  justify-self: end;
  align-items: center;
  min-width: 80px;
  width: 80px;
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