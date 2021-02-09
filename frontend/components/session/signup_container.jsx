import { connect } from 'react-redux';
import { createNewUser } from '../../actions/session_actions';
import Signup from './signup'


const mSTP = state => ({
  user: {username: '', email: '', password:''}
})


const mDTP = dispatch => ({
  createNewUser: (formUser) => dispatch(createNewUser(formUser))
})

// export default connect(null, mDTP)(Signup)
export default connect(mSTP, mDTP)(Signup)



