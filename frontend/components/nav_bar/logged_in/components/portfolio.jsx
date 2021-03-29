import React from 'react';
import { Link } from 'react-router-dom'

class Portfolio extends React.Component {
  render() {
    return (
      <div>
        {/* <Link className="normal-link" to='/portfolio'>Portfolio</Link> */}
        <a className="normal-link" href='https://www.linkedin.com/in/tului/'>Linkedin</a>
      </div>
    )
  }
}

export default Portfolio;