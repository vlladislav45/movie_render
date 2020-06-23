import styled from 'styled-components';

export const StyledRating = styled.div`
  text-align: center;
`;

export const StarContainer = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  display: inline-block;
  & > svg {   
    fill: ${props => props.theme.secondary};
  }
`;
