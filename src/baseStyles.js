import styled from 'styled-components';

export const Wrapper = styled.div`${props => {
  const { theme: { surface, secondary } } = props;
  return `
    background: ${surface};
    
    & ::selection {
      background: ${secondary}33;
    }
  `;
}}  
`;
