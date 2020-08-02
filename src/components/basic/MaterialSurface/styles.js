import styled from 'styled-components';
import {
  applyShadow,
  calcDarkThemeOverlay,
} from 'utils/colorUtils';
import {
  transitionDurations,
  transitionFunctions,
} from 'config/animationConstants';

const { standardEasing } = transitionFunctions;
const { largeExpand } = transitionDurations;

export const StyledMaterialSurface = styled.div`${
  ({
     theme, elevation, shouldElevateWhenHover, size,
   }) => {
    const { onSurface, surface, isDark } = theme;
    const borderRadius = (size === 'm' || size === 's')
      ? 4
      : 0;
    
    
    return `
      background: ${surface};
      color: ${onSurface};
      box-shadow: ${applyShadow(elevation)};
      
      border-radius: ${borderRadius}px;

      ${isDark && `
          box-shadow: ${applyShadow(elevation)},
            inset 0 0 0 2000px rgba(255,255,255,
            ${calcDarkThemeOverlay(elevation)});
      `};
      
      transition: box-shadow ${largeExpand}ms ${standardEasing};
      
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
