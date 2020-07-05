import React from 'react';

import './styles.css';

// TODO: Google's lighthouse performance test suggests not using gif
// Change logo
const Logo = props => {
  // TODO: Fix this
  // setTimeout(() => {
  //   let firstLogo = document.getElementById('logo');
  //   firstLogo.classList.add('second-logo');
  // }, 3000);

  return (
    <div
      style={{ width: '100px', display: 'flex', alignItems: 'center' }}
      {...props}
    >
      <div id="logo" className="first-logo"/>
    </div>
  );
};

export default Logo;
