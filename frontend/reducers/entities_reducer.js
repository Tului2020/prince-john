import { combineReducers } from 'redux';
import stocksReducer from './stocks_reducer';
import usersReducer from './users_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  stocks: stocksReducer
})

export default entitiesReducer;