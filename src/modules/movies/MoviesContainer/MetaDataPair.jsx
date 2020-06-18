import React from 'react';
import { MetaDataKey, MetaDataValue } from './styles';


export default ({ pairKey, pairValue }) => (
  <>
    <MetaDataKey>
      {pairKey}
    </MetaDataKey>
    <MetaDataValue>
      {pairValue}
    </MetaDataValue>
  </>
);