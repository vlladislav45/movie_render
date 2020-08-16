import styled, { css } from 'styled-components';
import { Rating } from 'components';
import { ProfileImage } from 'components/basic';


export const StyledSingleReview = styled.div`
  --padding: 12px;
  position: relative;
  flex: 0 1 100px;
  max-width: 100%;
  align-items: center;
  display: flex;
  padding: var(--padding) 0;
  ${props => `
    border-top: 1px solid ${props.theme.disabled}38;
    &:last-child {
      border-bottom: 1px solid ${props.theme.disabled}38;
    }
  `};
`;

export const AuthorsName = styled.p`
  position: absolute;
  left: 0;
  bottom: var(--padding);
  font-size: 0.9rem;
  color: ${props => props.theme.onSurface};
  
  transition: transform 100ms;
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

export const ReviewContent = styled.p`
  position: absolute;
  left: 60px;
  top: calc(var(--padding) - 5px);
  width: auto;
  height: calc(100% - (var(--padding) * 3) + 5px);
  font-size: 0.70rem;
  line-height: 1.05rem;
  color: ${props => props.theme.onSurfaceMD};
  
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* Disable scrollbar Chrome/Safari/Webkit */
  }
`;

export const ReviewRating = styled(Rating)`
  position: absolute;
  bottom: var(--padding);
  right: 0;
`;

const BaseImageStyle = css`
  position: absolute;
  top: var(--padding);
  width: 50px;
  max-width: 50px;
  height: 50px;
  max-height: 50px;
  outline: 1px solid #E4E6E7;
`
export const AuthorImage = styled.img`
  ${BaseImageStyle};
  
  transition: opacity 100ms;
  opacity: 0;
  ${props => props.$fadeIn && 'opacity: 1'};
`

export const OwnImage = styled(ProfileImage)`
  ${BaseImageStyle};
`;