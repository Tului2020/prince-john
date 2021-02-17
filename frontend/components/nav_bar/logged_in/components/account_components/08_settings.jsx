import React from 'react';
import { Link } from 'react-router-dom';
import { settingsIcon } from './icons';

class Settings extends React.Component {
  render() {
    return (
      <Link className="dropdown-content-child" 
        id="bottom-border"
        to='/referal'>
          {settingsIcon}Settings</Link>
    )
  }
}

export default Settings;