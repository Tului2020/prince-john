import { connect } from 'react-redux';
import { signin } from '../../actions/session_actions';
import LoginForm from './login_form'

const mSTP = state => ({
  errors: state.entities[state.errors.session.errors],
  formType: 'Log In'
})

const mDTP = dispatch => ({
  processForm: (currentUser) => dispatch(signin(currentUser)),
})


export default connect(mSTP, mDTP)(LoginForm)