import React from 'react';
import { Link } from 'react-router-dom';

class Settings extends React.Component {
  render() {
    return (
      <Link className="dropdown-content-child" 
        id="bottom-border"
        to='/referal'>Settings</Link>
    )
  }
}

export default Settings;