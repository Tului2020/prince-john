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
      <header>
        <div id="fixed">


          <div className="nav-bar">

            <h1 className="logo">PrinceJohn</h1>
            
            <div className="dropdowns">
              <div>Products</div>
              <div>Learn</div>
              <div>Support</div>
              <div>Who we are</div>
            </div>

            <div id="other-nav-bar">
            Place Holder
              {/* place holder div */}
            </div>

            <div id="other-nav-bar">
              Place Holder
              {/* place holder div */}
            </div>
            
            <div id="other-nav-bar">
              {display}
            </div>
          </div>
        </div>
      </header>

    
    );
  }
};

export default NavBar
