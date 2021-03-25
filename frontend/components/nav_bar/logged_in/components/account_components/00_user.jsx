import React from 'react';
import { connect } from 'react-redux';

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
          {formatter.format(this.props.portfolioValue)}
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


const mSTP = ({entities, session}) => ({
  currentUser: entities.users[session.currentUserId],
  portfolioValue: entities.portfolioValue.toFixed(2),
})

const mDTP = (dispatch) => ({})


const UserInfoContainer = connect(mSTP, mDTP)(UserInfo);
export default UserInfoContainer