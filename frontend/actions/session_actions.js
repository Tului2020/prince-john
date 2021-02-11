import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';


const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
})

const signoutCurrentUser = ()  => ({
  type: REMOVE_CURRENT_USER,

})
const receiveErrors = (errors) => ({ //array
  type: RECEIVE_SESSION_ERRORS,
  errors
})


export const signup = (user) => dispatch => (
  SessionApiUtil.signup(user)
    .then((newUser) => dispatch(receiveCurrentUser(newUser)))
    .fail((errors) => dispatch(receiveErrors(errors.responseJSON)))
  )

export const signin = (user) => dispatch => (
  SessionApiUtil.signin(user)
      .then((newUser) => dispatch(receiveCurrentUser(newUser)))
      .fail((errors) => dispatch(receiveErrors(errors.responseJSON)))
)

export const signout = () => dispatch => (
  SessionApiUtil.signout()
    .then(() => dispatch(signoutCurrentUser()))
    .fail((errors) => dispatch(receiveErrors(errors.responseJSON)))
)

