import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Input } from 'components/basic';
import { useDispatch } from 'react-redux';
import { promptUser } from '../../reducers/uiReducer';
import {
  ActionsBar,
  FormField,
  PromptContainer,
  PromptText,
  PromptTitle,
} from './styles';

const Prompt = props => {
  const {
    type = 'default',
    isOpen = false,
    title = 'Confirm',
    text = 'Confirm your action',
    onConfirm = review => {},
    formField = false,
    formFieldData = {},
    buttons = null,
    gridDimensions = {},
  } = props;
  const dispatch = useDispatch();
  const [promptOpen, setIsOpen] = useState(isOpen);
  const [formFieldValue, setFormFieldValue] = useState(null);

  useEffect(() => {
    if (isOpen !== promptOpen)
      setIsOpen(isOpen);
  }, [isOpen]);


  // Currently hacking store to update state there with timeout
  // Because otherwise Prompt goes to default props and changes appearance
  // before its closed
  // TODO: Find more clever way
  function updateReduxStore () {
    setTimeout(() => dispatch(promptUser({ isOpen: false })), 250);
  }

  function cancel () {
    setIsOpen(false);
    updateReduxStore();
  }

  function confirm () {
    setIsOpen(false);
    updateReduxStore();

    onConfirm(formFieldValue);
  }

  function renderFormField () {
    const { helperText, label, type, ...more } = formFieldData;
    return (
      <FormField isCompact={isCompact}>
        <Input
          focusOnMount
          label={label}
          inputType={type}
          helperText={helperText}
          onChange={e => setFormFieldValue(e.target.value)}
          {...more}
        />
      </FormField>
    );
  }

  function renderActionBar () {
    if (buttons)
      return (
        <>
          {buttons.map((buttonProps, index) => (
              <Button
                {...buttonProps}
                key={`action_btn_${index}`}
                onClick={() => buttonProps.onClick(formFieldValue)}
              />
            ),
          )}
        </>
      );
    return (
      <>
        <Button
          type='text'
          text='cancel'
          color='secondary'
          onClick={cancel}
        />
        <Button
          text='confirm'
          color='secondary'
          onClick={confirm}
        />
      </>
    );
  }

  const isCompact = type === 'compact';
  let { rows, cols } = gridDimensions;
  if (!rows)
    rows = isCompact ? 2 : 4;
  if (!cols)
    cols = isCompact ? 4 : 6;
  return (
    <Modal
      isOpen={promptOpen}
      closeOnClickOutside={false}
      slideDirection='toBottom'
      fade={true}
    >
      <PromptContainer
        rows={formField ? rows + 1 : rows}
        cols={cols}
        isCompact={isCompact}
      >
        <PromptTitle>{title}</PromptTitle>
        {!isCompact && <PromptText>{text}</PromptText>}
        {formField && renderFormField()}
        <ActionsBar>
          {renderActionBar()}
        </ActionsBar>
      </PromptContainer>
    </Modal>
  );
};

Prompt.propTypes = {
  type: PropTypes.oneOf(['default', 'compact']), //The type of prompt
  isOpen: PropTypes.bool, // Is the prompt open
  title: PropTypes.string, // Title of the prompt
  text: PropTypes.string, // Text of the prompt
  onConfirm: PropTypes.func, // Invoked when the default confirm button is clicked,
  // if formField prop is supplied its value will be passed as an argument
  formField: PropTypes.bool, // Should there be text with the prompt
  formFieldData: PropTypes.shape({ // If formField prop is false this will be ignored
    helperText: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.oneOf(['filled', 'textarea']),
  }),
  // If you want to pass a custom action bar to override the default one (cancel confirm)
  // pass array of props and for each props object a button will be rendered
  // and props will be passed to it
  // Note: You must handle close of the prompt manually (via redux store)
  buttons: PropTypes.arrayOf(PropTypes.object),
  gridDimensions: PropTypes.shape({
    rows: PropTypes.number,
    cols: PropTypes.number,
  }),
};

export default Prompt;

