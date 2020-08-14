import styled from 'styled-components';
import { Card } from 'components';

export const CastContainer = styled.div`
  ${props => props.$oneColumn
  ? `
    grid-area: 6 / 1 / 7 / -1;
  `
  : `
    grid-area: 4 / 2 / 5 / -1;
    height: 200px;
  `};
  max-height: 200px;
`;


export const CastCard = styled(Card)`
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CastSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  & > * {
    margin: 5px 3px;
  }
`;

export const CastSectionTitle = styled.h4`
  font-size: 1rem;
  margin-right: 15px;
  ${props => props.$oneColumn && `
    margin-right: 5px;
  `}
  color: ${props => props.theme.primary};
`;