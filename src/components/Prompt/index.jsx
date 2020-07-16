import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/basic';

const Prompt = props => {
  const {
    title = 'Confirm',
    text = 'Confirm your action',
    buttons = [],
    onConfirm = () => {},
    formField = false,
  } = props;

  return (
    <div>
      <Modal isOpen={true} />
    </div>
  )
};

Prompt.propTypes = {
  isOpen: PropTypes.bool, // Is the prompt open
  title: PropTypes.string, // Title of the prompt
  text: PropTypes.string, // Text of the prompt
  buttons: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    action: PropTypes.func,
  })), // Buttons of the prompt
  onConfirm: PropTypes.func, // Invoked when the default confirm button is clicked,
  // if formField prop is supplied its value will be passed as an argument
  formField: PropTypes.bool, // Should there be text with the prompt
};

export default Prompt;

