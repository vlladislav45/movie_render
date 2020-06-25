import styled from 'styled-components';

export const Wrapper = styled.div`${props => {
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
