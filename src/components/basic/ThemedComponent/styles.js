import styled from 'styled-components';
import { applyShadow, elevationStep, hexToRgb } from 'utils/colorUtils';

export const StyledThemedComponent = styled.div`
    ${({ theme: { primary, textColor }, elevation, isDark }) => {
  const { r, g, b } = hexToRgb(primary);
  return `
            color: ${textColor};
            box-shadow: ${applyShadow(elevation)};

            ${isDark && `
                // position: relative;
                // background: rgba(${r}, ${g}, ${b}, 0.${100 - Math.ceil(elevation * elevationStep)}) !important;
                box-shadow: ${applyShadow(elevation)}, inset 0 0 0 2000px rgba(255,255,255, 0.${Math.ceil(elevation * elevationStep)});
            `};
        `;
}
}
`;
