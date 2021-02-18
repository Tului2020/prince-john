import React from 'react';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})



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
          {formatter.format(100)}
            <br/>
            <span className="balance-status-description">
              Portfolio Value
            </span>
          </div>

          <div id="buying-power">
            {/* ${balance.toLocaleString()} */}
            {formatter.format(balance)}
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