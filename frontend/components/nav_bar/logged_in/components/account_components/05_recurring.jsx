import React from 'react';
import { Link } from 'react-router-dom';
import { recurringIcon } from './icons';

class Recurring extends React.Component {
  render() {
    return (
      <Link className="dropdown-content-child" to='/referal'>
        {recurringIcon}Recurring</Link>
    )
  }
}

export default Recurring;