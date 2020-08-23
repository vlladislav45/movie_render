import styled from 'styled-components';

export const StyledMoviesContainer = styled.div`
    position: relative;
    width: 80%;
    max-width: 80%;
    height: 100%;
    margin: 30px auto;
    overflow: hidden;
`;

export const NoMovies = styled.div`
  font-size: 1.5rem;
  text-align: center;
  width: 100%;
  color: ${props => props.theme.error};
`;
