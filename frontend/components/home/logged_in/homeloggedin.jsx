import React from 'react';
import LoggedInNavBarContainer from '../../nav_bar/logged_in/nav_bar_logged_in_container'
import { fetchUserInfo } from '../../../actions/session_actions';
import { connect } from 'react-redux';
import StockBar from '../../stock_bar/stock_bar';


class HomeLoggedIn extends React.Component {
  UNSAFE_componentWillMount() {
    // NEED TO CONFIRM WITH LINA IF THERES ANOTHER WAY TO GET CURRENT USER ID
    this.props.fetchUserInfo(parseInt(Object.keys(getState().entities.users)[0]));
  }

  render() {
    return (
    <div id="logged-in-home">
      <LoggedInNavBarContainer/>
      <div id="logged-in-bottom">
        <div id="logged-in-left">
        jdaklsjdsal
        </div>
          
        <div id="logged-in-right">
          <StockBar/>
        </div>

      </div>
    </div>
    )
  }
} 


const mDTP = (dispatch) => ({
  fetchUserInfo: (userId) => dispatch(fetchUserInfo(userId))
})

export default connect(null, mDTP)(HomeLoggedIn);
