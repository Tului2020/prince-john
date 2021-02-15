import React from 'react';


class Account extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.signout}>Log out</button>
      </div>
    )
  }
}

export default Account;