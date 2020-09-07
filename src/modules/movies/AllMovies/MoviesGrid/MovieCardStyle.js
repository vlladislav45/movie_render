import styled from 'styled-components';
import { applyShadow, calcDarkThemeOverlay } from 'utils/colorUtils';
import { Rating } from 'components';
import { Button } from 'components/basic';
import { transitionDurations, transitionFunctions } from 'config/animationConstants';
import { ReactComponent as BookMarkIcon } from 'assets/icons/bookmark.svg';
import { MOVIE_CARD_WIDTH } from '../constants';

const { standardEasing } = transitionFunctions;
export const SingleMovieLink = styled.div`${props => {
  const { theme } = props;
  const { isDark } = theme;
  
  return `
    position: relative;
    overflow: hidden;
    width: ${MOVIE_CARD_WIDTH}px;
    height: 450px;
    border-radius: 4px;
    margin: 0 auto;
    box-shadow: ${applyShadow(4)};
    ${isDark && `
          box-shadow: ${applyShadow(4)},
                      inset 0 0 0 2000px rgba(255,255,255,
                      ${calcDarkThemeOverlay(4)});
    `};
  `;
}
}
`;
// 65% lower section 35% poster (this way poster keeps 16/9 ratio)
export const CardLowerSection = styled.div`
  position: absolute;
  top: 35%;
  left: 0;
  width: 100%;
  height: 65%;
  padding: 8px;
  display: flex;
  flex-direction: column;
`;

export const MoviePoster = styled.img`
  width: 100%;
  height: 35%;
  opacity: 0;
  transition: opacity 0.3s;
  ${props => props.fadeIn && 'opacity: 1'};
`;

export const BookMarkFAB = styled.div`
  position: absolute;
  right: 10px;
  top: 30%;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  z-index: 99;
  background: ${props => props.theme.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${applyShadow(2)};
  transition: all ${transitionDurations.mediumExpand}ms ${standardEasing};
  &:hover {
    cursor: pointer;
    transform: scale(1.06);
    box-shadow: ${applyShadow(4)};
  }
  
  ${props => props.$disabled && `
    pointer-events: none;
    background: ${props.theme.disabled};
    box-shadow: none;
  `};
  
  ${props => props.$isLoading && `
    &:after {
      position: absolute;
      content: '';
      width: 80%;
      height: 80%;
      border-radius: 50%;
      border-top: 2px solid ${props.theme.overlay};
      animation: rotate 1s infinite ${standardEasing};
    }
    
    @keyframes rotate {
      from {
        transform: rotate(0);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `};
`;

export const BookMark = styled(BookMarkIcon)`
  fill: ${props => props.theme.onSecondary};
  & .sign-stroke {
    stroke: ${props => props.theme.onSecondary};
  }
  & .sign-circle {
    stroke: ${props => props.theme.onSecondary};
    fill: ${props => props.theme.contrast};
  }
  transition: opacity 0.5s;
  ${props => props.$isLoading && `
  
  `};
`;


export const MovieTitle = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  padding: 5px 0;
  
  font-size: 0.9rem;
  text-align: left;
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.onSurface};

`;

export const MovieSubTitle = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 0.7rem;
  & > :not(:first-child), & > :not(:last-child) {
    margin: 0 2px;
  }
  color: ${props => props.theme.onSurfaceMD};
`

export const MovieSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  height: 45%;
  overflow: hidden;
  font-family: 'Roboto', sans-serif;
`;

export const SummaryTitle = styled.p`
  font-size: 0.8rem;
  color: ${props => props.theme.onSurface};
  margin-bottom: 8px;
`;

export const Summary = styled.p`
  font-size: 0.75rem;
  color: ${props => props.theme.onSurfaceMD};
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* Disable scrollbar Chrome/Safari/Webkit */
  }
`;

export const Actors = styled.p`
  margin-top: 10px;
  font-size: 0.6rem;
  color: ${props => props.theme.onSurface};
`;

export const BottomBar = styled.div`
  margin-top: auto;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const WatchButton = styled(Button)`
  & button {
    font-size: 0.75rem!important;
  }
`;

export const Year = styled.p`
  text-align: left;
  color: ${props => props.theme.onSurface};
  font-size: .8rem;
`;

export const MovieRating = styled(Rating)`
  margin-left: auto;
  margin-right: 8px;
`;
