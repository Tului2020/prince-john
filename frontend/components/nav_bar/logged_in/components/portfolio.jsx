import React from 'react';
import { Link } from 'react-router-dom'

class Portfolio extends React.Component {
  render() {
    return (
      <div>
        <Link className="normal-link" to='/portfolio'>Portfolio</Link>
      </div>
    )
  }
}

export default Portfolio;