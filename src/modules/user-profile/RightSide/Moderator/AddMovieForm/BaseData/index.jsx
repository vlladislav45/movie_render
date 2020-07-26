import React from 'react';
import MovieUpload from './MovieUpload';
import PosterUpload from './PosterUpload';
import MoviePreview from './MoviePreview';
import { BaseDataWrapper } from './styles';

const BaseData = () => {
  return (
    <BaseDataWrapper>
      <MoviePreview/>
      <MovieUpload/>
      <PosterUpload/>
    </BaseDataWrapper>
  );
};

export default BaseData;
