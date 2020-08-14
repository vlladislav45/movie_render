import styled from 'styled-components';
import { Rating } from 'components';
import { ReactComponent as OpenIcon } from 'assets/icons/open.svg';


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
    color: ${props.$isOwn ? props.theme.primary : props.theme.onSurface};
    
    ${props.$isOwn && `
      box-shadow: 0px 0px 10px ${props.theme.primary};
    `};
  `};
`;

export const AuthorImage = styled.img`
  position: absolute;
  top: var(--padding);
  width: 50px;
  max-width: 50px;
  height: 50px;
  max-height: 50px;
`

export const AuthorsName = styled.p`
  position: absolute;
  left: 0;
  bottom: var(--padding);
  font-size: 0.9rem;
  transition: transform 100ms;
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

export const ReviewContent = styled.p`
  position: absolute;
  left: 60px;
  width: auto;
  height: calc(100% - (var(--padding) * 2));
  font-size: 0.75rem;
  line-height: 1.15rem;
  color: ${props => props.theme.onSurfaceMD};
  
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* Disable scrollbar Chrome/Safari/Webkit */
  }
`;

export const OpenButton = styled(OpenIcon)`
  position: absolute;
  left: max(15%, 70px);
  bottom: 0;
`;

export const ReviewRating = styled(Rating)`
  position: absolute;
  bottom: var(--padding);
  right: 0;
  background: ${props => props.theme.surface};
`;

export const TestBorder = styled.div`
  position: absolute;
  left: 0;
  bottom: var(--padding);
  width: 100%;
  height: 2px;
  background: red;
`;

export const TestBorder2 = styled.div`
  position: absolute;
  left: 0;
  top: var(--padding);
  width: 100%;
  height: 2px;
  background: red;
`;

