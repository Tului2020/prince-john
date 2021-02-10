import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import SessionForm from './session_form'

const mSTP = state => ({
  errors: state.entities[state.errors.session.errors],
  formType: 'Log In'
})

const mDTP = dispatch => ({
  processForm: (currentUser) => dispatch(login(currentUser)),
})


export default connect(mSTP, mDTP)(SessionForm)