import React from 'react';
import { Link } from "react-router-dom";

class LoggedInLogo extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">
          <img src={window.logo} className="logo-pic"/>
        </Link>
      </div>
    )
  }
}

export default LoggedInLogo;