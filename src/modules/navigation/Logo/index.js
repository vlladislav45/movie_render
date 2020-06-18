import React from 'react';

import './styles.css';

const Logo = () => {
  setTimeout(() => {
    let firstLogo = document.getElementById('logo');
    firstLogo.classList.add('second-logo');
  }, 3000);

  return (
    <div style={{ width: '100px', display: 'flex', alignItems: 'center' }}>
      <div id="logo" className="first-logo" />
    </div>
  );
};

export default Logo;
