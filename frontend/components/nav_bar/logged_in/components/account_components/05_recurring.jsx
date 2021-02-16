import React from 'react';
import { Link } from 'react-router-dom';

class Recurring extends React.Component {
  render() {
    return (
      <Link className="dropdown-content-child" to='/referal'>Recurring</Link>
    )
  }
}

export default Recurring;