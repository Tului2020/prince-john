import React from 'react';


class Account extends React.Component {
  render() {
    return (
      <div>
        Account
        <button className="drop-down-item" onClick={this.props.signout}>Log out</button>
      </div>
    )
  }
}

export default Account;