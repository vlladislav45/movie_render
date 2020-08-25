import styled from 'styled-components';

export const ACTIVE_RIPPLE_CLASS = 'rippleActive';
export const RIPPLE_DURATION = 180;
export const WithRipple = styled.div`
    position: relative;
    overflow: hidden;
    --opacity: ${({ $denseRipple }) =>  $denseRipple ? 0.32 : 0.12};
    &:after {
        position: absolute;
        content: "";
        width: 0px;
        height: 0px;
        left: 0;
        top: 0;
        border-radius: 50%;
        opacity: 0;
        pointer-events: none;
        transition: none;
        background: ${({ theme, $rippleColor }) => $rippleColor ? theme[$rippleColor] : theme.overlay};
   }
   
   &.${ACTIVE_RIPPLE_CLASS}:after {
        width: 1px;
        height: 1px;
        animation: doRipple ${RIPPLE_DURATION}ms linear forwards;
        opacity: var(--opacity);
    }
    @keyframes doRipple {
      from {
        transform: translate(var(--tx), var(--ty)) scale(0);
      }
      to {
        transform: translate(var(--tx), var(--ty)) scale(350);
      }
    };
`;