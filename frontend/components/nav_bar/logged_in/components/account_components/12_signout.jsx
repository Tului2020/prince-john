import React from 'react';


class Signout extends React.Component {
  render() {
    return (
      <span className="dropdown-content-child" onClick={this.props.signout}>Log Out</span>

    )
  }
}

export default Signout;