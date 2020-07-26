import styled from 'styled-components';

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
