import React from 'react';
import LoggedInNavBarContainer from '../../nav_bar/logged_in/nav_bar_logged_in_container'
import { fetchUserInfo } from '../../../actions/session_actions';
import { connect } from 'react-redux';
import StockBar from '../../stock_bar/stock_bar';
import { fetchUserStockInfo } from '../../../actions/stock_actions';


class HomeLoggedIn extends React.Component {
  componentDidMount() {
    // debugger

    this.userId = this.props.currentUser.id
    this.props.fetchUserInfo(this.userId);
    this.props.fetchUserStockInfo(this.userId);
  }

  render() {
    // debugger
    return (
    <div id="logged-in-home">
      <LoggedInNavBarContainer/>
      <div id="logged-in-bottom">
        <div id="logged-in-left">
        jdaklsjdsal
        </div>
          
        <div id="logged-in-right">
          <StockBar current_stocks={this.props.currentUser.current_stocks}/>
        </div>

      </div>
    </div>
    )
  }
} 

const mSTP = state => ({
  currentUser: state.entities.users[state.session.currentUserId]
}) 


const mDTP = (dispatch) => ({
  fetchUserInfo: (userId) => dispatch(fetchUserInfo(userId)),
  fetchUserStockInfo: (userId) => dispatch(fetchUserStockInfo(userId))
})

export default connect(mSTP, mDTP)(HomeLoggedIn);
