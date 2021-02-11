import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component{
  render() {
    const { currentUser, signout } = this.props

    let display = null;
    if (currentUser){
      display = (
        <div>
          <div className="btn">
            <button onClick={signout}>Log out</button>
          </div>
        </div>
      );
    } else {
      display = (
        <div>
          <div className="btn">
            <Link id="login" to="/login">Log In</Link>
            <Link id="signup" to="/signup">Sign Up</Link>
          </div>
        </div>)
    }
  
    return (
      <header className="nav-bar">
        <h1 className="logo">PrinceJohn</h1>
        <div className="dropdowns">
        <h2>Products</h2>
        <h2>Learn</h2>
        <h2>Support</h2>
        <h2>Who we are</h2>

        </div>
        <div>
          {display}
        </div>
      </header>
    );
  }
};

export default NavBar
