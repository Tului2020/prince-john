import React from 'react';
import { Link } from 'react-router-dom';

class Banking extends React.Component {
  render() {
    return (
      <Link className="dropdown-content-child" to='/referal'>Banking</Link>
    )
  }
}

export default Banking;