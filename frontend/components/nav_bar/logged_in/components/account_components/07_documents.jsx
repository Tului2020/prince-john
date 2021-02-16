import React from 'react';
import { Link } from 'react-router-dom';

class Documents extends React.Component {
  render() {
    return (
      <Link className="dropdown-content-child" to='/referal'>Documents</Link>
    )
  }
}

export default Documents;