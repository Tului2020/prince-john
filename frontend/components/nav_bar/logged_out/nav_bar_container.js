import { connect } from 'react-redux';
import NavBar  from './nav_bar'
import { signout } from '../../../actions/session_actions';


const mSTP = ({entities, session}) => ({
  currentUser: entities.users[session.currentUserId],
})

const mDTP = (dispatch) => ({
  signout: () => dispatch(signout()),

})

export default connect(mSTP, mDTP)(NavBar);