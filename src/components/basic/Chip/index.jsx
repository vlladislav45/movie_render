import React from 'react';
import PropTypes from 'prop-types';
import themes, { DARK_THEME } from 'utils/themes';
import { ChipContainer, CloseBtn, FilledChip, LeadingImage, OutlinedChip } from './styles';

const Chip = props => {
  const {
    chipType = 'filled',
    chipText = '',
    closeable = true,
    onClose = () => {
    },
    leadingIcon: LeadingIcon,
    color,
  } = props;

  const chipProps = {
    closeable,
    color,
    leadingIcon: !!LeadingIcon,
  };

  function renderLeadingIcon() {
    if (typeof LeadingIcon === 'object' && LeadingIcon.src) {
      const { src, alt } = LeadingIcon;
      return <LeadingImage
        src={src}
        alt={alt}
      />;
    } else {
      return <LeadingIcon className='leadingIcon'/>;
    }
  }

  return (
    <ChipContainer>
      {chipType === 'filled' && (
        <FilledChip
          {...chipProps}
        >
          {LeadingIcon && renderLeadingIcon()}
          {chipText}
          {closeable && <CloseBtn onClick={onClose}/>}
        </FilledChip>
      )}
      {chipType === 'outlined' && (
        <OutlinedChip
          {...chipProps}
        >
          {LeadingIcon && renderLeadingIcon()}
          {chipText}
          {closeable && <CloseBtn onClick={onClose}/>}
        </OutlinedChip>
      )}
    </ChipContainer>
  );
};

Chip.propTypes = {
  chipType: PropTypes.oneOf(['filled', 'outlined']),
  chipText: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  closeable: PropTypes.bool,
  onClose: PropTypes.func,
  color: PropTypes.oneOf(Object.keys(themes[DARK_THEME])), // One of the theme colors
  leadingIcon: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
    })
  ])
};

export default Chip;
