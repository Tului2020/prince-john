import React from 'react';
import { Link } from 'react-router-dom';
import { bankingIcon } from './icons';

class Banking extends React.Component {
  render() {
    return (
      <Link className="dropdown-content-child" to='/referal'>{bankingIcon}Banking</Link>
    )
  }
}

export default Banking;