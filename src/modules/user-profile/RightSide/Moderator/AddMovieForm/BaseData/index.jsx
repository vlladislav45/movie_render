import React, { useRef, useState } from 'react';
import { Button, Input } from 'components/basic';
import { useDispatch } from 'react-redux';
import MovieTitleInput from '../MovieTitleInput';
import { MovieFormRequired } from '../styles';
import MovieUpload from './MovieUpload';
import PosterUpload from './PosterUpload';
import { BaseDataWrapper } from './styles';

const BaseData = props => {
  return (
    <BaseDataWrapper>
      {/*<img src={} />*/}
      <MovieUpload/>
      <PosterUpload/>
    </BaseDataWrapper>
  );
};

export default BaseData;
