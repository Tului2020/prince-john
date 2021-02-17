import React from 'react';
import { Link } from 'react-router-dom';
import { documentsIcon } from './icons';

class Documents extends React.Component {
  render() {
    return (
      <Link className="dropdown-content-child" to='/referal'>
        {documentsIcon}Documents</Link>
    )
  }
}

export default Documents;