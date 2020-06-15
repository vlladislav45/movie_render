import styled from 'styled-components';

const BaseInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  position: relative;
  
  font-family: 'Roboto', sans-serif;
  
  & > *:not(BaseInput) {
    padding-left: 5%;
  }
`;

export const InputLabel = styled.span`${props => {
  const { height } = props.inputRef.current?.getBoundingClientRect() || {};
  const { height: labelHeight } = props.inputRef.current?.getBoundingClientRect() || {};
  const { focused } = props;
  const translateAmount = focused ? 0 : labelHeight - height / 2 - 2;
  
  return `
    position: absolute;
    
    transition: all .3s ease;
    will-change: transform, font-size;
    transform: translateY(${translateAmount}px);
    
    font-size: 1.1rem;
    ${focused && 'font-size: 0.9rem;'}
    
    
  `
}}`;

export const StyledFilledInputContainer = styled.div`${props => {
  const { theme } = props;
  const { surface, secondary, primary, textColor, disabled, isDark } = theme;
  const background = isDark ? '#121212' : '#F5F5F5';
  return `
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    
    background: #E0E0E0;
    border-bottom: 1px solid #00000099;
    
    padding: 5px 30px;
    height: 48px;
    
    &:hover {
      background: #D0D0D0;
      border-bottom: 1px solid ${textColor};
    }
  `;
}}`;

export const StyledFilledInput = styled(BaseInput)`${props => {
  const { theme } = props;
  const { surface, secondary, isDark } = theme;
  return `
    background: none;
    
    
    &:focus {
     
    }
  `;
}}`;

export const HelperText = styled.p`
  color: ${props => props.theme.textColor};
`;

export const ErrorText = styled.p`
  color: ${props => props.theme.error};
`;