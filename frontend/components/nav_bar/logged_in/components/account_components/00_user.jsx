import React from 'react';


class UserInfo extends React.Component {
  render() {
    const { first_name, last_name, balance } = this.props.currentUser;

    return (
      <div id="user-info">
        <div>
          {first_name} {last_name}

        </div>

        <div id="balance-status">
          <div id="portfolio-value">
            $100.00
            <br/>
            Portfolio Value
          </div>

          <div id="buying-power">
            ${balance}0
            <br/>
            Buying Power
          </div>

        </div>


      </div>
    )
  }
}

export default UserInfo;