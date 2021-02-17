import React from 'react';
import { Link } from 'react-router-dom';
import { accountIcon } from './icons';

class AccountDrop extends React.Component {
  render() {
    return (
      <Link className="dropdown-content-child" to='/referal'>{accountIcon}Account</Link>
    )
  }
}

export default AccountDrop;