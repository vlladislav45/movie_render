import styled from 'styled-components';
import {
  applyShadow,
  calcDarkThemeOverlay,
} from 'utils/colorUtils';

export const StyledThemedComponent = styled.div`${
  ({
    theme, elevation, shouldElevateWhenHover, size,
    coordinates = {}, rippleActive = false , rippleColor,
  }) => {
    const { onSurface, surface, isDark } = theme;
    const borderRadius = (size === 'm' || size === 's')
      ? 4
      : 0;

    let actualRippleColor = isDark
      ? 'rgba(255,255,255,.24)'
      : 'rgba(0,0,0,.24)';
    if (rippleColor)
      actualRippleColor = theme[rippleColor] + 40;
    
    const { x, y } = coordinates;
    return `
            overflow: hidden;
            position: relative;
            background: ${surface};
            color: ${onSurface};
            box-shadow: ${applyShadow(elevation)};
            
            border-radius: ${borderRadius}px;

            ${isDark && `
                box-shadow: ${applyShadow(elevation)},
                  inset 0 0 0 2000px rgba(255,255,255,
                  ${calcDarkThemeOverlay(elevation)});
            `};
            
            transition: box-shadow .5s;
            
            &:hover {
              ${shouldElevateWhenHover && ` 
                  cursor: pointer;
                  box-shadow: ${applyShadow(elevation + 6)};
                  ${isDark && `
                      box-shadow: ${applyShadow(elevation + 6)},
                      inset 0 0 0 2000px rgba(255,255,255,
                      ${calcDarkThemeOverlay(elevation + 6)});
                  `};
               `}
            }
            
            &:after {
               position: absolute;
               content: "";
               width: 5px;
               height: 5px;
               left: ${x}px;
               top: ${y}px;
               border-radius: 50%;
               opacity: 0;
               ${rippleActive && `
                 animation: materialRipple ${size === 'l' ? '.09s' : '.2s'} linear forwards;
                 
                 box-shadow: inset 0 0 0 500px ${actualRippleColor};
                 opacity: 1;
               `};
            }

             @keyframes materialRipple {
               100% {
                 transform: scale(130);
                 ${size === 'l' && 'transform: scale(150)'};
               }
             }
          
        `;
  }
}`;
/*
*   &:after {
               position: absolute;
               content: "";
               width: 5px;
               height: 5px;
               left: ${x}px;
               top: ${y}px;
               border-radius: 50%;
               opacity: 0;
               ${isActive && `
                 animation: doRipple .2s linear forwards;
                 opacity: 1;
               `}
           }

           @keyframes doRipple {
             100% {
               transform: scale(80);
             }
           }*/
