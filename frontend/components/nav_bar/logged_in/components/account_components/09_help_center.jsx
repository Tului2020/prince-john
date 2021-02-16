import React from 'react';
import { Link } from 'react-router-dom';

class HelpCenter extends React.Component {
  render() {
    return (
      <Link className="dropdown-content-child" to='/referal'>Help Center</Link>
    )
  }
}

export default HelpCenter;