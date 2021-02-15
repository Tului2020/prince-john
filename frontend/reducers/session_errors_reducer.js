import { RECEIVE_CURRENT_USER, RECEIVE_SESSION_ERRORS, REMOVE_ERRORS } from "../actions/session_actions";



const _errors ={
  errors: []
}

const sessionErrorsReducer = (state = _errors, action) => {

  Object.freeze(state);
  
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:  
      return action.errors;
    case RECEIVE_CURRENT_USER:
      return _errors;
    case REMOVE_ERRORS:
      // debugger
      return _errors;
    default:
      return state; 
  }
}

export default sessionErrorsReducer;