import { GET_USER_STOCKS } from "../actions/stock_actions";


const _nullSession = {
  stock_history: null,
  current_stocks: null
}

const stocksReducer = (state = _nullSession, action) => {
  Object.freeze(state);

  switch (action.type) {
    case GET_USER_STOCKS:
      return action.stockInfo
    default:
      return state
  }
}

export default stocksReducer;