import React from 'react';


class UserInfo extends React.Component {
  render() {
    return (
      <p>
        {this.props.currentUser.username}
      </p>
    )
  }
}

export default UserInfo;