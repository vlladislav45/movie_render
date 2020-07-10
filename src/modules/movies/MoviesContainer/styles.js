import styled from 'styled-components';
import { ThemedComponent } from 'components/basic';

// TODO: Responsive
export const StyledMoviesContainer = styled.div`${props => {
  const { moviesPerPage } = props;
  const COLUMNS = 3;
  const ROWS = Math.ceil(moviesPerPage / COLUMNS);
  return `
    position: relative;
    width: 80%;
    max-width: 80%;
    height: 100%;
    margin: 30px auto;
   `;
}}`;

export const MoviesGrid = styled.div`${props => {
  const COLUMNS = 3;
  return `
    position: absolute;
    width: 100%;
    height: 100%;
    
    margin: 30px auto;
    display: grid;
    grid-template-columns: repeat(${COLUMNS}, minmax(10px, 1fr));
    grid-auto-rows: min-content;
    grid-column-gap: 30px;
    grid-row-gap: 10px;

    & > .loading {
      grid-column: span ${COLUMNS};
    } 
    
    &.page-transition-prev-appear {
      opacity: 0;
    }
    
    &.page-transition-prev-appear-active, &.page-transition-prev-appear-done {
      opacity: 1;
      transition: opacity.3s linear, transform 0s;
    }
    
    &.page-transition-prev-enter {
      transform: translateX(-150%);
    }
    &.page-transition-prev-enter-active, &.page-transition-prev-enter-done {
      transform: translateX(0);
      transition: transform 500ms cubic-bezier(0.4, 0.0, 0.2, 1);
    }
    
    &.page-transition-prev-exit {
      transform: translateX(0);

    }
    &.page-transition-prev-exit-active, &.page-transition-prev-exit-done {
      transform: translateX(150%);
      transition: transform 500ms cubic-bezier(0.4, 0.0, 0.2, 1);
    }
    
    &.page-transition-next-enter {
      transform: translateX(150%);
    }
    &.page-transition-next-enter-active {
      transform: translateX(0);
      transition: transform 500ms cubic-bezier(0.4, 0.0, 0.2, 1);
    }
    
    &.page-transition-next-exit {
      transform: translateX(0);    
    }
    &.page-transition-next-exit-active {
      transform: translateX(-150%);
      transition: transform 500ms cubic-bezier(0.4, 0.0, 0.2, 1);
    }
    `;
}}`;

export const SingleMovieLink = styled(ThemedComponent)`${props => {
  return `
    padding: 5px 0;
    // Margin between all the children
    & > * {
      margin: 10px 0;
      font-family: 'Lato', sans-serif;
    }
  `;
}
}
`;

export const PosterContainer = styled.div`
  position: relative;
  
  /* 16:9 aspect ratio */
  &::after {
    display: block;
    content: '';
    padding-bottom: 62.55%;
  }
`;

export const MoviePoster = styled.img`
    opacity: 0;
    transition: opacity 1s;
    ${props => props.fadeIn && 'opacity: 1'};
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
`;

export const MovieNameText = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  padding: 5px 0;
  
  font-size: 1.2rem;
  text-align: center;
  color: ${props => props.theme.onSurface};
  
  @media only screen and (max-width: 600px) {
    font-size: 1rem;
  }
`;

export const Year = styled.p`
  text-align: center;
  color: ${props => props.theme.onSurface};
  font-size: .8rem;
`;

export const Views = styled.p`
  margin-top: -10px;
  font-weight: bold;
  text-align: center;
  color: ${props => props.theme.secondary};
  font-size: .8rem;
`;

export const NoMovies = styled.div`
  font-size: 1.5rem;
  text-align: center;
  width: 100%;
  color: ${props => props.theme.error};
`;
