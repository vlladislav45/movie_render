import styled from 'styled-components';

const BaseInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 1rem;
`;

export const OuterContainer = styled.div`
  //display: flex;
  //flex-direction: column;
  //align-items: baseline;
  position: relative;
  
  // Helper and error text
  & > p {
    color: ${props => props.theme.isDark ? 'rgba(255,255,255,.6);' : 'rgba(0,0,0,.6);'};
    padding-left: 16px;
    height: 16px;
    align-self: bottom;
    font-size: 0.65rem;
    letter-spacing: 0.03em;
    margin: 2px 0;
  }
`;

export const StyledFilledInputContainer = styled.div`${props => {
  const { theme, focused, error } = props;
  const { error: errorColor, primary, textColor, disabled, accent, isDark } = theme;
  const background = isDark ? '#252525' : '#F5F5F5';
  const hoverBg = isDark ? '#2e2e2e' : '#ECECEC';
  const hoverBorderColor = isDark ? '#FFFFFF88' : '#00000088';
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
      border-bottom-color: ${accent};
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
      fill: ${textColor};
    }
    
    ${focused && `
      &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 80%;
        background-color: ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0, 0, 0, 0.1)'};
        animation-name: ripple-bg;
        animation-duration: .3s;
        animation-fill-mode: forwards;
      }
    `}
  `;
}}`;

export const InputLabel = styled.label`${props => {
  const { accent, error, isDark } = props.theme;
  const { elevated, withLeadingIcon, hasError } = props;
  const color = isDark ? '#CCCCCC' : '#585858';
  return `
    position: absolute;
    
    font-family: 'Roboto', sans-serif;
    color: ${color};
    line-height: 1.15rem;
    user-select: none;

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
    
    ${hasError && `
      color: ${error};
    `};
    
    ${withLeadingIcon && `
      left: 48px;
    `};
    
  `;
}}`;

export const StyledFilledInput = styled(BaseInput)`${props => {
  const { theme, focused, withLeadingIcon, hasError } = props;
  const { accent, error, textColor, isDark } = theme;
  const color = isDark ? '#CCCCCC' : '#585858';
  return `
    align-self: flex-end;
    background: none;
    padding: 20px 16px 6px;
    caret-color: ${accent};
    z-index: 10;
    color: ${textColor};
    
    cursor: ${focused ? 'text' : 'pointer'};
    
    ${withLeadingIcon && `
      padding-left: 48px;
    `};
    
    ${hasError && `
      caret-color: ${error};
    `};
    
    &::selection {
      background: ${accent}33;
    }
    
    &::placeholder {
      color: ${color};
    }
  `;
}}`;

export const HelperText = styled.p`
  color: ${props => props.theme.textColor};
`;

export const ErrorText = styled.p`
  color: ${props => props.theme.error}!important;
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
