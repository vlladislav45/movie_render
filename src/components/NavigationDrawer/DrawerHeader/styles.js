import styled from 'styled-components';
import React from 'react';
import { ProfileImage } from 'components/basic';
import Button from 'components/basic/Button';
import { ReactComponent as DarkModeIcon } from 'assets/icons/moon.svg';


export const StyledDrawerHeader = styled.div`
  position: relative;
  height: 150px;
  padding-top: 16px;
  padding-left: 16px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: min-content 1fr 1fr;
`;

export const LoginButton = styled(Button)`
  grid-area: 3 / 1 / 3 / span 3;
  align-self: end;
  margin-bottom: 4px;
`
export const RegisterButton = styled(Button)`
  grid-area: 3 / 3 / 3 / span 3;
  align-self: end;
  margin-bottom: 4px;
`

export const DarkModeToggle = styled.span`
  grid-area: 1 / 4 / 1 / -1;
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

export const MoonIcon = React.memo(styled(DarkModeIcon)`
  width: 24px;
  height: 24px;
  
  ${({ $isDark, theme }) => !$isDark && `
    & >.moon {
      fill: ${theme.onSurface};
      &.moonShadow {
        fill: ${theme.onSurface}AA;
      }
    }
    
    & >.stars {
      fill: ${theme.surface};
    }
    
    & > .crescent {
      fill: ${theme.surface};
      &.crescentDark {
        fill: ${theme.disabled}AA;
      }
    }
  `};
`);

export const FormContainer = styled.div`
  transition: opacity 500ms;
  opacity: ${props => props.$isVisible ? 1 : 0};
`;