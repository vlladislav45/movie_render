import styled from 'styled-components';
import { applyShadow, getOverlay } from 'utils/colorUtils';
import { ACTIVE_RIPPLE_CLASS, WithRipple } from 'components/Styled/BaseRipple';

const FONT_SIZE = '0.875rem';
export const LeadingIcon = styled.span`
  width: ${FONT_SIZE};
  height: ${FONT_SIZE};
  margin-right: 8px;
  
  & > svg {
    width: ${FONT_SIZE};
    height: ${FONT_SIZE};
  }
`;
interface ButtonWrapperProps {
  ref: any,
}
export const ButtonWrapper = styled.div<Pick<ButtonWrapperProps, any>>`
  display: flex;
  width: auto;
  position: relative;
  height: 36px;
  min-height: 36px;
  align-items: center;
`;

interface BaseButtonProps {
  withIcon: boolean
}
export const BaseButton = styled(WithRipple)<Pick<BaseButtonProps, any>>`${props => {
  const { withIcon } = props;
  return `
    ${withIcon && 'padding: 0 16px 0 12px'};
    transition: all .3s ease;
    display: flex;
    align-items: center;
    width: auto;
    justify-content: center;
    height: 100%;
    min-width: 4rem;
    padding: 0 16px;
    outline: none;
    border: none;
    text-transform: uppercase;
    border-radius: 4px;
    font-size: ${FONT_SIZE};
    font-family: 'Roboto', sans-serif;
    letter-spacing: 1.25px;
    white-space: nowrap;
    background: none; 
    user-select: none;
    
    position: relative;
    overflow: hidden;
    cursor: pointer;
    
   // HOVER override :before background color property and opacity on hover to use
   &:before {
    transition: all .2s ease;
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    opacity: 0;
   }
   
   &:focus, &:active, &:focus-inner {
    outline: none;
    border: none;
   }
  `;
}}
`;

