import { combineReducers } from 'redux';
import historyReducer from './history_reducer';
import stocksReducer from './stocks_reducer';
import usersReducer from './users_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  stocks: stocksReducer,
  history: historyReducer
})

export default entitiesReducer;