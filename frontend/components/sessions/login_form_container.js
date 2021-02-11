import { connect } from 'react-redux';
import { signin } from '../../actions/session_actions';
import SessionForm from './session_form'

const mSTP = state => ({
  errors: state.entities[state.errors.session.errors],
  formType: 'Log In'
})

const mDTP = dispatch => ({
  processForm: (currentUser) => dispatch(signin(currentUser)),
})


export default connect(mSTP, mDTP)(SessionForm)