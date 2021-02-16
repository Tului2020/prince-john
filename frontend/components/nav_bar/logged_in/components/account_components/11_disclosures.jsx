import React from 'react';
import { Link } from 'react-router-dom';

class Disclosures extends React.Component {
  render() {
    return (
      <Link to='/disclosures' className="dropdown-content-child"
      id="bottom-border"
        >Disclosures</Link>
    )
  }
}


export default Disclosures;