import React from 'react';
import { Link } from 'react-router-dom'

class FreeStocks extends React.Component {
  render() {
    return (
      <div>
        <Link className="normal-link" to='/referal'>Free Stocks</Link>
      </div>
    )
  }
}

export default FreeStocks;