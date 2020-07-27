import styled from 'styled-components';
import { NORMAL_Z_INDEX } from 'config/zIndexes';
import { ThemedComponent } from 'components/basic';
import { applyShadow } from 'utils/colorUtils';

export const BaseDataWrapper = styled.div`
  width: 48%;
  display: grid;
  grid-template-areas: " v v "
                       " p m ";
                       
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto min-content;
  grid-row-gap: 10px;                     
`;

export const VideoPreview = styled.div`
  grid-area: v;
  position: relative;
`;

export const VideoElement = styled.video`
  z-index: ${NORMAL_Z_INDEX};
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const MovieUploadBtn = styled.div`
  grid-area: m;
  justify-self: flex-end;
`;

export const PosterUploadBtn = styled.div`
  grid-area: p;
`;

export const PreviewError = styled(ThemedComponent)`
  position: absolute;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  padding: 5px 10px;
  width: 90%;
  left: 5%;
  background: ${props => props.theme.surface};
  color: ${props => props.theme.error};
  z-index: ${NORMAL_Z_INDEX + 1};
`;
