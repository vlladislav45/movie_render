import styled from 'styled-components';
import {
  applyShadow,
  calcDarkThemeOverlay,
} from 'utils/colorUtils';

export const StyledThemedComponent = styled.div`${
  ({ theme: { textColor, surface, isDark }, elevation, shouldElevateWhenHover, size }) => {
    const borderRadius = (size === 'm' || size === 's')
      ? 4
      : 0;
    
    return `
            background: ${surface};
            color: ${textColor};
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
        `;
  }
}`;
