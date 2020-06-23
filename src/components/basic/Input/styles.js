import styled from 'styled-components';

const BaseInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 1rem;
`;

export const OuterContainer = styled.div`
  position: relative;
  
  // Helper and error text
  & > p {
    font-family: 'Roboto', sans-serif; 
    padding-left: 16px;
    height: 16px;
    align-self: bottom;
    font-size: 0.75rem;
    letter-spacing: 0.03rem;
    margin: 2px 0;
  }
`;

export const StyledFilledInputContainer = styled.div`${props => {
  const { theme, focused, error, isOnPrimary } = props;
  const { error: errorColor, primary, onSurface, disabled, secondary, isDark } = theme;
  const background = isDark ? '#252525' : '#F5F5F5';
  const hoverBg = isDark ? '#2e2e2e' : '#ECECEC';
  const hoverBorderColor = isDark ? '#FFFFFF88' : '#00000088';
  const accentColor = isOnPrimary ? secondary : primary;
  return `
    transition: all .3s;
    display: flex;
    position: relative;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    overflow: hidden;
    background: ${background};
    border-bottom: 1px solid ${disabled};
    
    font-size: 1rem;
    
    ${focused && `
      border-bottom-color: ${accentColor};
    `};
    
    ${error && `
      border-bottom-color: ${errorColor};
      caret-color: ${errorColor};
    `};
    
    &:hover {
      ${!focused && `
        background: ${hoverBg};
      `};
      ${!focused && !error && `
        border-bottom-color: ${hoverBorderColor};
      `};
    }
    
    & > svg {
      position: absolute;
      left: 16px;
      width: 24px;
      height 24px;
      align-self: center;
      fill: ${onSurface};
    }
    
    ${focused && `
      &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 80%;
        background-color: ${isDark
    ? 'rgba(255,255,255,0.1)'
    : 'rgba(0, 0, 0, 0.1)'};
        animation-name: ripple-bg;
        animation-duration: .3s;
        animation-fill-mode: forwards;
      }
    `}
  `;
}}`;

export const InputLabel = styled.label`${props => {
  const { primary, error, secondary, isDark } = props.theme;
  const { elevated, withLeadingIcon, hasError, isFocused, isOnPrimary } = props;
  const color = isDark ? '#CCCCCC' : '#585858';
  const accentColor = isOnPrimary ? secondary : primary;
  return `
    position: absolute;
    
    font-family: 'Roboto', sans-serif;
    color: ${color};
    line-height: 1.15rem;
    user-select: none;

    will-change: transform;
    transition: transform .1s ease, color .1s ease;
    transform-origin: left top;
   
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    
    ${elevated && `
      transition: transform .3s ease, color .3s ease;
      transform: translateY(-90%) scale(0.75);
      ${isFocused && `color: ${accentColor}`};
    `};
    
    ${hasError && `
      color: ${error};
    `};
    
    ${withLeadingIcon && `
      left: 48px;
    `};
    
  `;
}}`;

export const StyledFilledInput = styled(BaseInput)`${props => {
  const { theme, focused, withLeadingIcon, hasError, isOnPrimary } = props;
  const { primary, error, disabled, onSurface, isDark, secondary } = theme;
  const color = isDark ? '#CCCCCC' : '#585858';
  const accentColor = isOnPrimary ? secondary : primary;
  return `
    align-self: flex-end;
    background: none;
    padding: 20px 16px 6px;
    caret-color: ${accentColor};
    z-index: 10;
    color: ${onSurface};
    
    cursor: ${focused ? 'text' : 'pointer'};
    
    ${withLeadingIcon && `
      padding-left: 48px;
    `};
    
    ${hasError && `
      caret-color: ${error};
    `};
    
    &::selection {
      background: ${secondary}44;
    }
    
    &::placeholder {
      color: ${color};
    }
  `;
}}`;

export const HelperText = styled.p`
  color: ${props => props.theme.onSurface};
  // color: #00454D;
`;

export const ErrorText = styled.p`
  color: ${props => props.theme.error}!important;
`;

export const RippleElem = styled.span`
  position: absolute;
  will-change: width, left;
  left: 50%;
  height: 100%;
  
  ${({ theme, hasError, isOnPrimary }) => {
  const accentColor = isOnPrimary ? theme.secondary : theme.primary;
  const color = hasError ? theme.error : accentColor;
  return `border-bottom: 2px solid ${color}`;
}};
  
  &.activate {
    animation-name: ripple;
    animation-duration: .1s;
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
