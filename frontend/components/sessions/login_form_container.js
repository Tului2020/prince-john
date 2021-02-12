import { connect } from 'react-redux';
import { signin } from '../../actions/session_actions';
import LoginForm from './login_form'

const mSTP = state => ({
  // console.log(state.errors.session.errors)


    errors: state.errors.session,
    formType: 'Log In'

  
})

const mDTP = dispatch => ({
  processForm: (currentUser) => dispatch(signin(currentUser)),
})


export default connect(mSTP, mDTP)(LoginForm)