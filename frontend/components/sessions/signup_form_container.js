import { connect } from 'react-redux';
import { deleteErrors, signup } from '../../actions/session_actions';
import SignupForm from './signup_form';

const mSTP = (state) => ({
  errors: state.errors.session,
  formType: 'Sign Up'
})

const mDTP = (dispatch) => ({
  processForm: (currentUser) => dispatch(signup(currentUser)),
  deleteErrors: () => dispatch(deleteErrors())
})


export default connect(mSTP, mDTP)(SignupForm)