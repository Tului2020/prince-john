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
            <span className="balance-status-description">
              Portfolio Value
            </span>
          </div>

          <div id="buying-power">
            ${balance}
            <br/>
            <span className="balance-status-description">
              Buying Power
            </span>
          </div>

        </div>


      </div>
    )
  }
}

export default UserInfo;