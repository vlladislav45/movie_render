import styled from 'styled-components';
import { applyShadow, elevationStep, hexToRgb } from 'utils/colorUtils';

export const StyledThemedComponent = styled.div`
    ${({ theme: { primary, textColor }, elevation, isDark }) => {
  const { r, g, b } = hexToRgb(primary);
  return `
            transition: filter 2s;
            color: ${textColor};
            box-shadow: ${applyShadow(elevation)};

            ${isDark && `
                background: rgba(${r}, ${g}, ${b}, 0.${100 - Math.ceil(elevation * elevationStep)});
                box-shadow: ${applyShadow(elevation / 2)};
            `};
        `;
}
}
`;