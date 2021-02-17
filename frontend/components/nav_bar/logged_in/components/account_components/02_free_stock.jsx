import React from 'react';
import { Link } from 'react-router-dom';
import { freeStockIcon } from './icons';

class FreeStocks extends React.Component {
  render() {
    return (
      <Link className="dropdown-content-child" to='/referal'>
        {freeStockIcon}
        Free Stock</Link>
    )
  }
}

export default FreeStocks;