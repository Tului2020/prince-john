import React from 'react';
import { logOutIcon } from './icons';


class Signout extends React.Component {
  render() {
    return (
      <span className="dropdown-content-child" onClick={this.props.signout}>
        {logOutIcon}Log Out</span>

    )
  }
}

export default Signout;