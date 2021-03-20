import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const REMOVE_ERRORS = 'REMOVE_ERRORS';
export const GET_USER_INFO = 'GET_USER_INFO';




const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
})

const signoutCurrentUser = () => ({
  type: REMOVE_CURRENT_USER,

})
const receiveErrors = (errors) => ({ //array
  type: RECEIVE_SESSION_ERRORS,
  errors
})

const removeErrors = () => ({
  type: REMOVE_ERRORS
})





export const fetchUserInfo = (userId) => dispatch => (
  SessionApiUtil.fetchUserInfo(userId)
    .then((newUser) => dispatch(receiveCurrentUser(newUser))
    )
)

export const deleteErrors = () => dispatch => {
  return dispatch(removeErrors())
}


export const signup = (user) => dispatch => (
  SessionApiUtil.signup(user)
    .then((newUser) => dispatch(receiveCurrentUser(newUser)))
    .fail((errors) => dispatch(receiveErrors(errors.responseJSON)))
)

export const signin = (user) => dispatch => (
  SessionApiUtil.signin(user)
    .then((newUser) => {
      dispatch(receiveCurrentUser(newUser))
    })
    .fail((errors) => { dispatch(receiveErrors(errors.responseJSON)) })
)

export const signout = () => dispatch => (
  SessionApiUtil.signout()
    .then(() => dispatch(signoutCurrentUser()))
    .fail((errors) => dispatch(receiveErrors(errors.responseJSON)))
)

