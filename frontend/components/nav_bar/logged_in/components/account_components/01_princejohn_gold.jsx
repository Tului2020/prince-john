import React from 'react';
import { Link } from 'react-router-dom';
import { goldIcon } from './icons';



goldIcon

class PrinceJohnGold extends React.Component {
  render() {
    return (
      <Link className="dropdown-content-child" id="gold" to='/referal'>
          {goldIcon}   PrinceJohn Gold
          </Link>
    )
  }
}

export default PrinceJohnGold;