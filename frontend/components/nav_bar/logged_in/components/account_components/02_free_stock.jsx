import React from 'react';
import { Link } from 'react-router-dom';

class FreeStocks extends React.Component {
  render() {
    return (
      <Link className="dropdown-content-child" to='/referal'>Free Stock</Link>
    )
  }
}

export default FreeStocks;