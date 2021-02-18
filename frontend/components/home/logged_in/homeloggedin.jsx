import React from 'react';
import LoggedInNavBarContainer from '../../nav_bar/logged_in/nav_bar_logged_in_container'
import { fetchUserInfo } from '../../../actions/session_actions';
import { connect } from 'react-redux';


class HomeLoggedIn extends React.Component {
  componentWillMount() {
    this.props.fetchUserInfo(4);
  }

  render() {
    return (
    <div id="logged-in-home">
      <LoggedInNavBarContainer/>
    </div>
    )
  }
} 


const mDTP = (dispatch) => ({
  fetchUserInfo: (userId) => dispatch(fetchUserInfo(userId))
})

export default connect(null, mDTP)(HomeLoggedIn);
