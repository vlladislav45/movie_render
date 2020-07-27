import styled from 'styled-components';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { getOverlay } from 'utils/colorUtils';


const BaseChip = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 32px;
  border-radius: 20px;
  padding: 0 12px;
  color: ${props => props.isDark ? props.theme.onSurfaceMD : props.theme.onSurface};
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  white-space: nowrap;
  
  ${props => props.leadingIcon && `
    padding-left: 4px;
    & > svg.leadingIcon {
      width: 24px;
      height: 24px;
      margin-right: 8px;
      fill: ${props.isDark ? props.theme.onSurfaceMD : props.theme.onSurface};
    }
  `};
  
  ${props => props.closeable && `
    padding-right: 8px;
  `};
`;

export const ChipContainer = styled.div`
`;

export const OutlinedChip = styled(BaseChip)`
  ${({ theme, color: chipColor }) => {
    const { surface, contrast } = theme;
    const color = chipColor 
      ? theme[chipColor]
      : getOverlay(surface, contrast, 0.54);
    return`
       border: 1px solid ${color};
       & > svg {
        fill: ${color}!important;
       }
    `}
  };
`;

export const FilledChip = styled(BaseChip)`
  ${({ theme, color }) => `
    background: ${theme[color]+'99' || getOverlay(theme.surface, theme.contrast, 0.12)};
  `};
`;

export const CloseBtn = styled(CloseIcon)`
  ${({ theme }) => `
      width: 18px;
      height: 18px;
      margin-left: 8px;
      fill: ${theme.onSurface};
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
  `};
`;

export const LeadingImage = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  border-radius: 50%;
`;
