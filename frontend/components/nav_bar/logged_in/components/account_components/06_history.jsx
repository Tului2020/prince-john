import React from 'react';
import { Link } from 'react-router-dom';
import { historyIcon } from './icons';

class History extends React.Component {
  render() {
    return (
      <Link className="dropdown-content-child" to='/referal'>
        {historyIcon}History</Link>
    )
  }
}

export default History;