import React from 'react';
import { Link } from 'react-router-dom';

class AccountDrop extends React.Component {
  render() {
    return (
      <Link className="dropdown-content-child" to='/referal'>Account</Link>
    )
  }
}

export default AccountDrop;