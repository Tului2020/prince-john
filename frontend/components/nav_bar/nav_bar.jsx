import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component{
  render() {
    const { currentUser } = this.props

    let display = null;
    if (!currentUser){
      display = (
        <div>
          <Link className="" to="/login">Log In</Link>
          <Link className="btn" to="/signup">Sign Up</Link>
        </div>
      );
    }
  
    return (
      <header className="nav-bar">
        <h1 className="logo">PrinceJohn</h1>
        <div>
          {display}
        </div>
      </header>
    );
  }
};

export default NavBar
