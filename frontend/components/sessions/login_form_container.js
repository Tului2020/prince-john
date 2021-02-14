import { connect } from 'react-redux';
import { deleteErrors, signin} from '../../actions/session_actions';
import LoginForm from './login_form'

const mSTP = state => ({
    errors: state.errors.session,
    formType: 'Log In'
})

const mDTP = dispatch => ({
  processForm: (currentUser) => dispatch(signin(currentUser)),
  clearErrors: () => dispatch(deleteErrors())
})


export default connect(mSTP, mDTP)(LoginForm)