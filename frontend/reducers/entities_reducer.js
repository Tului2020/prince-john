import { combineReducers } from 'redux';
import companyInfoReducer from './companyinfo_reducer';
import historyReducer from './history_reducer';
import portfolioValueReducer from './portfolio_reducer';
import stocksReducer from './stocks_reducer';
import usersReducer from './users_reducer';

// displayValueReducer
const entitiesReducer = combineReducers({
  users: usersReducer,
  stocks: stocksReducer,
  history: historyReducer,
  portfolioValue: portfolioValueReducer,
  companyInfo: companyInfoReducer
})

export default entitiesReducer;