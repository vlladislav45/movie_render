import styled from 'styled-components';
import { applyShadow } from 'utils/colorUtils';
import { FULL_HD, L, M, SM, XL, XS_SM } from 'utils/mediaUtils';
import { transitionDurations } from 'config/animationConstants';
import { VERY_HIGH_Z_INDEX } from 'config/zIndexes';
import { calcDarkThemeOverlay } from 'utils/colorUtils';
import { Genres } from 'components';
import { ReactComponent as MenuIcon } from 'assets/icons/menu-24px.svg';
import { ReactComponent as ExpandIcon } from 'assets/icons/expand.svg';
import Title from '../Title';
import SearchBar from '../SearchBar';


const { smallArea } = transitionDurations;
export const StyledTopNav = styled.div`
    ${({ theme: { primary, isDark, surface }, device, isExtended, isScrolled }) => {

    
	return `
    position: relative;
    width: 100%;
    height: 56px;
    background:  ${isDark ? surface : primary};
    z-index: ${VERY_HIGH_Z_INDEX};
    // We dont need anything positioned right below it
    margin-bottom: 30px;
    
    // TODO: Maybe dark theme overlay is too much
    box-shadow: ${applyShadow(16)};
    ${isDark && `
      box-shadow: ${applyShadow(16)},
      inset 0 0 0 2000px rgba(255,255,255,
      ${calcDarkThemeOverlay(16)});
    `};
    
    
    transition: height ${smallArea}ms, transform ${smallArea}ms;
    overflow: hidden;
    ${isExtended && `
      height: 128px;
    `};
`;
}}`;

export const TopNavInner = styled.div`
  display: flex;
  flex-direction: column;
  height: 128px;
  padding: 0 16px;
  
  & > :first-child {
    height: 56px;
    padding-top: 16px;
  }
  
  & svg.navbar-action {
    width: 24px;
    height: 24px;
    cursor: pointer;
    fill: ${props => props.theme.onSurface};
    &:hover {
      fill: ${props => props.theme.onSurface + 88};
    }
  }

`;


export const TopNavRow = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;

export const TopNavMenu = styled(MenuIcon)`
  justify-self: flex-start;
`;

export const TopNavTitle = styled(Title)`
  flex: 1 1 auto;
  padding-left: 32px;
  align-self: center;
  ${props => props.$deviceWidth < 360 && 'padding-left: 12px'};
`;

export const TopNavExpand = styled(ExpandIcon)`
  transition: transform ${smallArea}ms;
  ${props => props.$isExpanded && `
    transform: rotate(180deg);
  `};
`;

export const TopNavSearch = styled(SearchBar)`
  width: 24px;
  height: 24px;
  margin-right: 24px;
`;

export const TopNavGenres = styled(Genres)`
  align-self: center;
  margin: 0 auto;
`;