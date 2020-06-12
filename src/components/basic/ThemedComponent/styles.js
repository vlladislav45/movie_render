import styled from 'styled-components';
import { applyShadow, elevationStep } from 'utils/colorUtils';

export const StyledThemedComponent = styled.div`${
  ({ theme: { textColor, surface }, elevation, isDark, shouldElevateWhenHover }) => {
    return `
            background: ${surface};
            color: ${textColor};
            box-shadow: ${applyShadow(elevation)};

            ${isDark && `
                box-shadow: ${applyShadow(elevation)}, inset 0 0 0 2000px rgba(255,255,255, ${(elevation * elevationStep) / 100});
            `};
            
            transition: all .5s;
            
            &:hover {
              ${shouldElevateWhenHover && ` 
                  cursor: pointer;
                  box-shadow: ${applyShadow(elevation + 6)};
                  ${isDark && `
                      box-shadow: ${applyShadow(elevation + 6)}, inset 0 0 0 2000px rgba(255,255,255, ${(elevation + 6 * elevationStep) / 100});
                  `};
               `}
            }
        `;
  }
}`;
