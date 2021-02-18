import { combineReducers } from 'redux';
import usersReducer from './users_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  // stocks:
})

export default entitiesReducer;