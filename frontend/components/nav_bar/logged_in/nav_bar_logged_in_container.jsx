import { connect } from 'react-redux';
import LoggedInNavBar  from './nav_bar_logged_in'
import { signout } from './../../../actions/session_actions';
import { getIntraDayThunk } from '../../../actions/history_actions';


const mSTP = (state) => ({
  currentUser: state.entities.users[state.session.currentUserId],
  current_stocks: state.entities.stocks.current_stocks,
  history: state.entities.history,
})

const mDTP = (dispatch) => ({
  signout: () => dispatch(signout()),
  getIntraDayThunk: (ticker) => dispatch(getIntraDayThunk(ticker))
})

export default connect(mSTP, mDTP)(LoggedInNavBar);