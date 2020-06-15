import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { DropDownList, StyledDropDown } from './styles.js';
import DropDownItem from './DropDownItem';

export const DropDown = ({ topOffset, items = {} }) => {
  const dispatch = useDispatch();

  const { isOpen } = useSelector(({
                                    uiReducer: { userDropDownOpen },
                                    auth: { isLoggedIn },
                                  }) => ({
    isOpen: userDropDownOpen && isLoggedIn,
  }));

  return (
    <StyledDropDown
      isOpen={isOpen}
      topOffset={topOffset}
      elevation={12}
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
