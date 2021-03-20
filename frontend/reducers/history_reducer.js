import { STOCK_HISTORY } from "../actions/history_actions";


const historyReducer = (state={}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case STOCK_HISTORY:
      // console.log(action.stockHistory)
      return Object.assign({}, state, {[action.ticker]: action.stockHistory})
    default:
      return state
  }

}

export default historyReducer;