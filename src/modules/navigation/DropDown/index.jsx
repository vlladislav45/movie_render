import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { closeUserDropDown } from 'reducers/uiReducer';

import DropDownItem from './DropDownItem';
import { DropDownList, StyledDropDown } from './styles.js';

export const DropDown = ({ topOffset, items = {} }) => {
  const ref = useRef();
  const dispatch = useDispatch();

  const { isOpen } = useSelector(({
    uiReducer: { userDropDownOpen },
    auth: { isLoggedIn },
  }) => ({
    isOpen: userDropDownOpen && isLoggedIn,
  }));

  useEffect(() => {
    if (isOpen)
      document.addEventListener('click', checkIfClickOutside);
    return () => document.removeEventListener('click', checkIfClickOutside);
  }, [isOpen]);

  function checkIfClickOutside (e) {
    const { current } = ref;

    let clicked = document.elementFromPoint(e.clientX, e.clientY);
    while (clicked !== document.body) {
      if (clicked === current) return;
      clicked = clicked.parentNode;
    }

    dispatch(closeUserDropDown());
  }

  return (
    <StyledDropDown
      ref={ref}
      isOpen={isOpen}
      topOffset={topOffset}
      elevation={16}
    >
      <DropDownList>
        {items.map((item, index) => (
          <DropDownItem
            key={index}
            element={item}
          />
        ))}
      </DropDownList>
    </StyledDropDown>
  );
};

DropDown.propTypes = {
  topOffset: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.elementType,
  })),
};

export default DropDown;
