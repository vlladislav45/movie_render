import styled from 'styled-components';

export const StyledRegisterForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  & > .register-input {
    width: 100%;
  }
  
  & > *:not(:last-child) {
    margin: 5px 0;
  }
  
  & > :last-child {
    margin: 10px 0;
  }
`;

export const StyledLoginForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  & > * {
    margin: 7px 0;
  }
 
  & > :last-child, & > :first-child {
    margin: 5px 0;
  }
`;

export const FormTitle = styled.h3`
  font-size: 1.4rem;
  font-family: 'Roboto', sans-serif;
  // align-self: start;
  color: ${props => props.theme.primary};
`;

export const ErrorMessage = styled.p`
  color: ${props => props.theme.error};
  font-size: 1.1rem;
  font-family: 'Roboto', sans-serif;
  margin: 12px 0!important;
`;
