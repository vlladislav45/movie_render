import styled from 'styled-components';
import { Card, Rating } from 'components';

export const StyledRatingSection = styled.div`
  grid-area: 2 / 1 / 3 / 1;
  position: relative;
  top: -35px;
  
  max-width: 100%;
  ${props => props.$oneColumn && `
    grid-area: 3 / 1 / 4 / -1;
    top: 0;
  `};
`;

export const ReviewsContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 100%;
`;

export const RateMovieBtn = styled(Rating)`
  flex: 0 0 auto;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: -20px; // Counter the padding
  margin-bottom: 15px;
`;

export const NoReviewsText = styled.p`
  width: 100%;
  margin-top: 10px;
  font-size: 0.9rem;
  color: ${props => props.theme.onSurface};
`;

