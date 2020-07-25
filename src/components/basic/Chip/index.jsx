import React from 'react';
import PropTypes from 'prop-types';
import { ChipContainer, FilledChip, OutlinedChip } from './styles';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';

const Chip = props => {
  const {
    chipType = 'filled',
    chipText = '',
    closeable = true,
    leadingIcon: LeadingIcon,
  } = props;

  const chipProps = {
    closeable,
    leadingIcon: !!LeadingIcon,
  };

  return (
    <ChipContainer>
      {chipType === 'filled' && (
        <FilledChip
          {...chipProps}
        >
          {LeadingIcon && <LeadingIcon/>}
          {chipText}
          {closeable && <CloseIcon/>}
        </FilledChip>
      )}
      {chipType === 'outlined' && (
        <OutlinedChip
          {...chipProps}
        >
          {LeadingIcon && <LeadingIcon/>}
          {chipText}
          {closeable && <CloseIcon/>}
        </OutlinedChip>
      )}
    </ChipContainer>
  );
};

Chip.propTypes = {
  chipType: PropTypes.oneOf(['filled', 'outlined']),
  chipText: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  closeable: PropTypes.bool,
  leadingIcon: PropTypes.elementType,
};

export default Chip;
