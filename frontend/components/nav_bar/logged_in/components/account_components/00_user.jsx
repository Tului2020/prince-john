import React from 'react';


class UserInfo extends React.Component {
  render() {
    return (
      <p id="user-info" >
        {this.props.currentUser.username}
      </p>
    )
  }
}

export default UserInfo;