import styled from 'styled-components';
import { transitionFunctions, transitionDurations } from 'config/animationConstants';
import { SM, XS_SM, M, L } from 'utils/mediaUtils';

const { largeExpand, largeCollapsing } = transitionDurations;
const { standardEasing, deceleratedEasing, acceleratedEasing } = transitionFunctions;

export const StyledMoviesGrid = styled.div`${props => {
  const { fadeIn, moviesPerPage, $device } = props;

  const columns = getColumns($device, moviesPerPage);
  const rows = Math.ceil(moviesPerPage / columns);
  return `
    display: grid;
    grid-template-columns: repeat(${columns}, 1fr);
    grid-template-rows: repeat(${rows}, auto);
    grid-auto-rows: min-content;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    
    width: 100%;
    height: 100%;
    position: relative;
    opacity: 0;
    ${fadeIn && `
      transition: opacity 300ms;
      opacity: 1
    `};
    `;
}}`;

export const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  
  margin: 30px auto;
  
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
      return Math.min(2, moviesPerPage);
    default :
      return Math.min(3, moviesPerPage);
  }
}