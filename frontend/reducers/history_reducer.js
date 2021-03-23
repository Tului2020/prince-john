import * as d3 from 'd3';
import { STOCK_HISTORY } from "../actions/history_actions";

const dataParser = (myData) => {
  let parsedData = d3.csv.parse(myData);
  let date = parsedData[0].timestamp.slice(0, 10);
  let marketOpen = new Date(`${date} 09:30:00`);
  let marketClose = new Date(`${date} 18:30:00`);
  let parsedDataObj = {};
  let previousHourTracker = new Date(`${date} 09:25:00`);
  let hourTracker = new Date(`${date} 09:30:00`);


  parsedData.forEach(el => {
    let date = d3.time.format("%Y-%m-%d %H:%M:%S").parse(el.timestamp);
    if (marketOpen <= date && date <= marketClose) {
      let price = (parseFloat(el.open) + parseFloat(el.close)).toFixed(2) / 2;
      parsedDataObj[date] = price;
    }
  })

  while (hourTracker <= marketClose) {
    let hourTrackerPrice = parsedDataObj[hourTracker]
    if (!hourTrackerPrice) {
      parsedDataObj[hourTracker] = parsedDataObj[previousHourTracker]
    }
    hourTracker = new Date(hourTracker.setMinutes(hourTracker.getMinutes() + 5))
    previousHourTracker = new Date(previousHourTracker.setMinutes(previousHourTracker.getMinutes() + 5))
  }

  
  // nned to fix issues with going from array to object

  return Object.keys(parsedDataObj).map(date => {date, price: parsedDataObj[date]})
}



const historyReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case STOCK_HISTORY:
      return Object.assign({}, state, { [action.ticker]: dataParser(action.stockHistory) })
    default:
      return state
  }

}

export default historyReducer;