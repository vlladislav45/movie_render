import styled from 'styled-components';
import { applyShadow, hexToRgb, elevationStep } from 'utils/colorUtils';
import { ThemedComponent } from 'components/basic';


export const StyledTopNav = styled(ThemedComponent)`
    ${( { theme: { primary } }) => {
        return `
            display: flex;
            padding: 50px;
            background:  ${primary};
        `}
    }
`;