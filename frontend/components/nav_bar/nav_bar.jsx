import React from 'react';
import { Link } from 'react-router-dom';


const NavBar = ({currentUser, logout}) => {
  const display = currentUser? (
    <div>
      <p>Hello, {currentUser}</p>
      <button onClick={logout}>Log Out</button>
    </div>
  ) : (
    <div>
      <Link className="btn" to="/signup">Sign up</Link>
      <Link className="btn" to="/login">Login</Link>
    </div>
  )

  // const display = (
  //   <div>
  //     <Link className="btn" to="/signup">Sign up</Link>
  //     <Link className="btn" to="/login">Login</Link>
  //   </div>
  // )
  // return null;
  return (
    <header className="nav-bar">
      <h1 className="logo">PrinceJohn</h1>
      <div>
        {display}
      </div>
    </header>
  );
};

// class NavBar extends React.Component{
//   render(){
//     return null;
//   }
// }



export default NavBar;



