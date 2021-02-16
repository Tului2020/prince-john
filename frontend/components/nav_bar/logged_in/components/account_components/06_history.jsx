import React from 'react';
import { Link } from 'react-router-dom';

class History extends React.Component {
  render() {
    return (
      <Link className="dropdown-content-child" to='/referal'>History</Link>
    )
  }
}

export default History;