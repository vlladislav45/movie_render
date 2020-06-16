import styled from 'styled-components';

const BaseInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 1rem;
`;

export const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  position: relative;
  
  font-family: 'Roboto', sans-serif;
  font-size: 22px;
  
  // Helper and error text
  & > p {
    padding-left: 16px;
  }
`;


export const StyledFilledInputContainer = styled.div`${props => {
  const { theme, focused, withLeadingIcon } = props;
  const { surface, secondary, primary, textColor, disabled, accent, isDark } = theme;
  const background = isDark ? '#121212' : '#F5F5F5';
  return `
    display: flex;
    position: relative;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    
    background: #F5F5F5;
    border-bottom: 1px solid #00000088;
    
    font-size: 1rem;
    
    ${focused && `
      border-bottom: 2px solid ${accent};
    `};
    
    &:hover {
      background: #ECECEC;
      ${!focused && `
        border-bottom: 1px solid #00000033;
      `};
    }
    
    & > svg {
      position: absolute;
      left: 16px;
      width: 24px;
      height 24px;
      align-self: center;
    }
    
  `;
}}`;

export const InputLabel = styled.label`${props => {
  const { accent } = props.theme;
  const { elevated, withLeadingIcon } = props;
  return `
    position: absolute;
    
    font-family: 'Roboto', sans-serif;
    line-height: 1.15rem;
    
    
    will-change: transform;
    transition: transform .3s ease, color .3s ease;
    transform-origin: left top;
   
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    
    ${elevated && `
      transform: translateY(-90%) scale(0.75);
      color: ${accent};
    `};
    
    ${withLeadingIcon && `
      left: 48px;
    `};
    
  `
}}`;

export const StyledFilledInput = styled(BaseInput)`${props => {
  const { theme, focused, withLeadingIcon } = props;
  const { accent, surface, secondary, isDark } = theme;
  return `
    align-self: flex-end;
    background: none;
    padding: 20px 16px 6px;
    caret-color: ${accent};
    
    cursor: ${focused ? 'text' : 'pointer'};
    
    ${withLeadingIcon && `
      padding-left: 48px;
    `};
    
    &::selection {
      background: ${accent}33;
    }
  `;
}}`;

export const HelperText = styled.p`
  color: ${props => props.theme.textColor};
`;

export const ErrorText = styled.p`
  color: ${props => props.theme.error};
`;
