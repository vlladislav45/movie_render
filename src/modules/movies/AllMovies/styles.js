import styled from 'styled-components';
import { Button } from 'components/basic';

// TODO: When adding ads, max width and width should depend on device type
// lower devices need more width %
export const StyledMoviesContainer = styled.div`
    position: relative;
    width: 90%;
    max-width: 90%;
    margin: 30px auto;
    overflow-x: hidden;
`;

export const NoMovies = styled.div`
  font-size: 1.5rem;
  text-align: center;
  width: 100%;
  color: ${props => props.theme.error};
`;

export const ResetFilterButton = styled(Button)`
  margin: auto;
  width: min-content;
`;

ResetFilterButton.displayName = 'ResetFilterButton'
