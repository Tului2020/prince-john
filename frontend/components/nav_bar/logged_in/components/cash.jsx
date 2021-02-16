import React from 'react';
import { Link } from 'react-router-dom'

class Cash extends React.Component {
  render() {
    return (
      <div>
        <Link className="normal-link" to='/cash'>Cash</Link>
      </div>
    )
  }
}

export default Cash;