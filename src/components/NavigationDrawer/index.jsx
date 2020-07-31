import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, Overlay } from './styles';

const NavigationDrawer = props => {
  return (
    <Overlay id='DRAWER' isOpen={true}>
      <Drawer
        elevation={16}
      >
        <div>DADAD</div>
        <div>DADAD</div>
        <div>DADAD</div>
      </Drawer>
    </Overlay>
  );
};

NavigationDrawer.propTypes = {

};

export default NavigationDrawer;