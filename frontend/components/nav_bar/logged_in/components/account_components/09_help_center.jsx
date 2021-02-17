import React from 'react';
import { Link } from 'react-router-dom';
import { helpCenterIcon } from './icons';

class HelpCenter extends React.Component {
  render() {
    return (
      <Link className="dropdown-content-child" to='/referal'>
        {helpCenterIcon}Help Center</Link>
    )
  }
}

export default HelpCenter;