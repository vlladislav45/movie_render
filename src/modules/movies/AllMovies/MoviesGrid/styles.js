import styled from 'styled-components';
import { transitionDurations, transitionFunctions } from 'config/animationConstants';
import { L, M, SM, XS_SM } from 'utils/mediaUtils';
import { MOVIE_CARD_WIDTH } from '../constants';

const { largeExpand, largeCollapsing } = transitionDurations;
const { deceleratedEasing, acceleratedEasing } = transitionFunctions;

export const StyledMoviesGrid = styled.div`${props => {
  const { fadeIn } = props;

  return `
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(${MOVIE_CARD_WIDTH}px, 1fr));
    grid-auto-rows: min-content;
    grid-column-gap: 10px;
    grid-row-gap: 20px;
    

    position: relative;
    opacity: 0;
    ${fadeIn && `
      transition: opacity 300ms;
      opacity: 1
    `};
    `;
}}`;

// Adding the margin creates small space when loading TODO: Investigate
export const Wrapper = styled.div`
  width: 100%;
  
  // margin: 30px auto;
  
  &.page-transition-prev-enter {
    transform: translateX(-120%);
  }
  &.page-transition-prev-enter-active, &.page-transition-prev-enter-done {
    transform: translateX(0);
    transition: transform ${largeExpand}ms ${deceleratedEasing};
  }

  &.page-transition-prev-exit {
    transform: translateX(0);
  }
  
  &.page-transition-prev-exit-active, &.page-transition-prev-exit-done {
    transform: translateX(120%);
    transition: transform ${largeCollapsing}ms ${acceleratedEasing};
  }
  
  &.page-transition-next-enter {
    transform: translateX(120%);
  }
  &.page-transition-next-enter-active, &.page-transition-next-enter-done {
    transform: translateX(0);
    transition: transform ${largeExpand}ms ${deceleratedEasing};
  }

  &.page-transition-next-exit {
    transform: translateX(0);
  }
  &.page-transition-next-exit-active, &.page-transition-next-exit-done {
    transform: translateX(-120%);
    transition: transform ${largeCollapsing}ms ${acceleratedEasing};
  }
`;

function getColumns(device, moviesPerPage) {
  switch (device) {
    case XS_SM:
    case SM:
      return Math.min(1, moviesPerPage);
    case M:
    case L:
      return Math.min(3, moviesPerPage);
    default :
      return Math.min(5, moviesPerPage);
  }
}