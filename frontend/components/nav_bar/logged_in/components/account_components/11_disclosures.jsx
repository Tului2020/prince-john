import React from 'react';
import { Link } from 'react-router-dom';
import { disclosuresIcon } from './icons';

class Disclosures extends React.Component {
  render() {
    return (
      <Link to='/disclosures' className="dropdown-content-child"
      id="bottom-border">
        {disclosuresIcon}Disclosures</Link>
    )
  }
}


export default Disclosures;