import * as d3 from 'd3';
import { STOCK_HISTORY } from "../actions/history_actions";

const dataParser = (myData) => {
  return d3.csv.parse(myData).map(el => {
    let price = (parseFloat(el.open) + parseFloat(el.close)).toFixed(2) / 2;
    let date = d3.time.format("%Y-%m-%d %H:%M:%S").parse(el.timestamp);
    return { date, price }
  })
}



const historyReducer = (state={}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case STOCK_HISTORY:
      debuggera
      return Object.assign({}, state, {[action.ticker]: dataParser(action.stockHistory)})
    default:
      return state
  }

}

export default historyReducer;