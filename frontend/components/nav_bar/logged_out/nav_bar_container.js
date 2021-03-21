import { connect } from 'react-redux';
import NavBar  from './nav_bar'
import { signout } from '../../../actions/session_actions';


const mSTP = (state) => ({
  currentUser: state.entities.users[state.session.currentUserId],
})

const mDTP = (dispatch) => ({
  signout: () => dispatch(signout()),

})

export default connect(mSTP, mDTP)(NavBar);