import styled from 'styled-components';

export const MainContent = styled.div`${props => {
  const { theme: { surface, secondary } } = props;
  return `
    background: ${surface};
    height: 100%;
    
    & ::selection {
      background: ${secondary}33;
    }
  `;
}}  
`;

export const Inner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
