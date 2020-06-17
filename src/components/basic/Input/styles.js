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
  const { theme, focused, withLeadingIcon, error } = props;
  const { surface, error: errorColor, primary, textColor, disabled, accent, isDark } = theme;
  const background = isDark ? '#121212' : '#F5F5F5';
  return `
    transition: all .3s;
    display: flex;
    position: relative;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    overflow: hidden;
    background: #F5F5F5;
    border-bottom: 1px solid ${disabled};
    
    font-size: 1rem;
    
    ${focused && `
      border-bottom-color: ${accent};
    `};
    
    ${error && `
      border-bottom-color: ${errorColor};
      caret-color: ${errorColor};
    `};
    
    &:hover {
      background: #ECECEC;
      ${!focused && !error && `
        border-bottom-color: #00000066;
      `};
    }
    
    & > svg {
      position: absolute;
      left: 16px;
      width: 24px;
      height 24px;
      align-self: center;
    }
    
    ${focused && `
      &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 80%;
        background-color: rgba(0, 0, 0, 0.1);
        animation-name: ripple-bg;
        animation-duration: .3s;
        animation-fill-mode: forwards;
      }
    `}
  `;
}}`;

export const InputLabel = styled.label`${props => {
  const { accent, textColor } = props.theme;
  const { elevated, withLeadingIcon } = props;
  return `
    position: absolute;
    
    font-family: 'Roboto', sans-serif;
    color: #505050;
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
    
  `;
}}`;

export const StyledFilledInput = styled(BaseInput)`${props => {
  const { theme, focused, withLeadingIcon } = props;
  const { accent } = theme;
  return `
    align-self: flex-end;
    background: none;
    padding: 20px 16px 6px;
    caret-color: ${accent};
    z-index: 10;
    
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

export const RippleElem = styled.span`
  position: absolute;
  will-change: width, left;
  left: 50%;
  height: 100%;
  
  border-bottom: 2px solid ${({ theme, hasError }) => hasError
  ? theme.error
  : theme.accent};
  
  &.activate {
    animation-name: ripple;
    animation-duration: .3s;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }
  
  @keyframes ripple{
    0% {
      width: 0%;
      left: 50%;
    }
    100% {
      width: 100%;
      left: 0;
      
    }
  }
  
  @keyframes ripple-bg {
    from {
      opacity: 0;
      transform: scale(0);
     }
     to {
      opacity: 1;
      transform: scale(1.5);
     }
  }
`;
