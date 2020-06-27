import styled from 'styled-components';
import { Button, ThemedComponent } from 'components/basic';
import { applyShadow } from '../../../utils/colorUtils';


export const SingleMovieWrapper = styled.div`
  display: grid;
  
  // 12 column grid system
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: min-content repeat(11, minmax(min-content, 1fr));
  grid-row-gap: 20px;
  grid-auto-flow: row;
  
  max-width: 100%;
  height: 200vh;
  max-height: 200vh;
  & > * {
    // width: 100%;
    // height: 100%;
    max-width: 100%;
    // max-height: 100%;
  }
`;

// TODO: change to button
export const BackArrowWrapper = styled(Button)`
  grid-column: 2 / auto;
  grid-row: 1 / 2;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  color: ${props => props.theme.secondary};
  font-family: 'Lato', sans-serif;

  & > svg {
    width: 24px;
    height: 24px;
    fill: ${props => props.theme.secondary};
  }
`;

export const MovieVideo = styled.video`
  width: 100%;
  height: 100%;
  grid-column: 2 / -2;
  grid-row: 2 / 6;
  object-fit: fill;
  // To span full columns and rows
  width: 100%;
  height: 100%;
`;

export const MovieTitle = styled.div`
  grid-column: 2 / 12;
  grid-row: 6 / 7;
  font-family: 'Marck script', cursive;
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 0.15rem;
  
  display: grid;
  & > p {
    align-self: end;
    text-align: center;
  }
  
  color: ${props => props.theme.onSurface}
`;

export const StyledMovieSummary = styled.div`
  transition: all .3s;
  grid-column: 2 / 12;
  grid-row: 7 / 9;
  font-family: 'Roboto', sans-serif;
  text-align: justify;
  font-size: 1rem;
  letter-spacing: .6px;
  line-height: 1.5rem;
  overflow: hidden;
  ${props => props.isExtended && `
      // grid-row: 7 / 14;
      animation: expand .7s ease forwards;
      box-shadow: ${applyShadow(5)};
      padding: 0 10px;
  `};
  
  @keyframes expand {
    0% {
      // height: 0;
      grid-row: 7 / 9;
    }
    100% {
      // height: 2000px;
      grid-row: 7 / 14;
    }
  }
  
  color: ${props => props.theme.onSurfaceMD}
`;

export const ReadMore = styled(Button)`
  grid-column: 2 / auto;
  grid-row: 9 / 10;
  margin-top: 0.5rem;
  text-align: center;
  font-weight: 500;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  white-space: no-wrap;
  
  cursor: pointer;
  user-select: none;
  text-transform: capitalize;
  color: ${props => props.theme.secondary};
`;

export const MoreInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  // padding: 12px 16px;
`;
