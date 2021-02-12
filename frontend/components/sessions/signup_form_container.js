import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import SignupForm from './signup_form';

const mSTP = (state, ownProps) => ({
  errors: state.errors.session,
  formType: 'Sign Up'
})

const mDTP = (dispatch, ownProps) => ({
  processForm: (currentUser) => dispatch(signup(currentUser)),
})


export default connect(mSTP, mDTP)(SignupForm)