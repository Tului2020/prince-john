import * as d3 from 'd3';
import { STOCK_HISTORY, STOCK_HISTORY_LOCAL } from "../actions/history_actions";

const dataParser = (myData) => {
  let parsedData = d3.csv.parse(myData);
  let date = parsedData[0].timestamp.slice(0, 10);
  let marketOpen = new Date(`${date} 09:30:00`);
  let marketClose = new Date(`${date} 18:30:00`);
  let parsedDataObj = {};
  
  let retArr = [];
  let missingPricesIndex = [];


  parsedData.forEach(el => {
    let date = d3.time.format("%Y-%m-%d %H:%M:%S").parse(el.timestamp);
    if (marketOpen <= date && date <= marketClose) {
      let price = (parseFloat(el.open) + parseFloat(el.close)).toFixed(2) / 2;
      parsedDataObj[date] = price;
    }
  })

  for (let i = 0; i < 109; i ++) {
    let date = new Date(marketOpen);
    date = new Date(date.setMinutes(date.getMinutes() + 5 * i))

    let price = parsedDataObj[date]
    if (price) {
      retArr.push({date, price})
    } else {
      retArr.push({date})
      missingPricesIndex.push(i)
    }
  }

  missingPricesIndex.forEach(idx => {
    let priceInterpolated = false;
    let delta = 1

    while (!priceInterpolated) {
      if (idx + delta <= 108) {
        if (retArr[idx + delta].price) {
          retArr[idx].price = retArr[idx + delta].price
          priceInterpolated = true;
        }
      } else {
        if (retArr[idx - delta].price) {
          retArr[idx].price = retArr[idx - delta].price
          priceInterpolated = true;
        }
      }
      delta += 1
    }

  })
  return retArr
}

const localDataParser = ({ticker, date, history}) => {
  console.log(`${ticker} Local`)
  let baseDate = new Date(date.split(' ').slice(0, 4).join(' ') + ' 09:30:00')
  let returnData = []
  history.split(',').forEach((price, idx) => {
    let currentDate = new Date(baseDate);
    currentDate = new Date(currentDate.setMinutes(currentDate.getMinutes() + 5 * idx))
    returnData.push({date: currentDate, price: parseFloat(price)})
  })

  return {[ticker]: returnData}
}




const historyReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case STOCK_HISTORY:
      return Object.assign({}, state, { [action.ticker]: dataParser(action.stockHistory) })
    case STOCK_HISTORY_LOCAL:
      
      return Object.assign({}, state, localDataParser(action.stockHistory))

    default:
      return state
  }

}

export default historyReducer;