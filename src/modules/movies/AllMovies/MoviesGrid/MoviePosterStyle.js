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
  top: 90%;
  left: 0;
  width: 100%;
  height: 65%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const MoviePoster = styled.img`
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.3s;
  cursor: pointer;
  ${props => props.fadeIn && 'opacity: 1'};
`;

export const BookMarkFAB = styled.div`
  position: absolute;
  right: 10px;
  top: 0%;
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

export const BottomBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const WatchButton = styled(Button)`
  & button {
    font-size: 0.75rem!important;
  }
`;

export const MovieRating = styled(Rating)`
  margin-left: auto;
  margin-right: 8px;
`;