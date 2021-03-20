import { GET_USER_STOCKS, NEW_USER_STOCK } from "../actions/stock_actions";


const _nullSession = {
  stock_history: null,
  current_stocks: null
}




const stocksReducer = (state=_nullSession, action) => {
  Object.freeze(state);

  switch (action.type) {
    case GET_USER_STOCKS:
      return action.stockInfo

    // case NEW_USER_STOCK:
    //   return 

    default:
      return state
  }
}

export default stocksReducer;