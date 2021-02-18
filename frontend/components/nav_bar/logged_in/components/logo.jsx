import React from 'react';


class LoggedInLogo extends React.Component {
  render() {
    return (
      <div>
        <img src={window.logo} className="logo-pic"/>
      </div>
    )
  }
}

export default LoggedInLogo;