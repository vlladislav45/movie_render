import React from 'react';
import styled from 'styled-components';
import { L, lessThen } from 'utils/mediaUtils';
import { Input, Button } from 'components/basic';

export const RateDialogWrapper = styled.div`
  display: flex;
  flex-direction: column;
 ${p => lessThen(p.$device, L)
  ? `
    width: 70vw;
    font-size: 0.8rem;
  `
  : `
    width: 40vw;
    font-size: 1rem;
  `};
`;

export const RateDialogTitle = styled.h3`
  font-size: 1.1em;
  color: ${p => p.theme.onSurface};
  margin-bottom: 5px;
`;

export const RateDialogActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const RateDialogAction = styled(props => <Button {...props} />)``;


export const RateDialogInput = styled(props => <Input {...props} />)`
  margin: 10px 0;
`;