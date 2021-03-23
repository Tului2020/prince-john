import * as d3 from 'd3';
import { STOCK_HISTORY } from "../actions/history_actions";

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


  
  // while (hourTracker <= marketClose) {
  //   let hourTrackerPrice = parsedDataObj[hourTracker]
  //   if (hourTrackerPrice) {
  //     retArr.push({date: new Date(hourTracker), price: hourTrackerPrice})
  //   } else {
  //     retArr.push({date: new Date(hourTracker)})
  //   }
  //   hourTracker = new Date(hourTracker.setMinutes(hourTracker.getMinutes() + 5))
  // }

  // debugger
  // nned to fix issues with going from array to object

  // return Object.keys(parsedDataObj).map(date => ({date: new Date(date), price: parsedDataObj[date]}))
  return retArr
}


const dataParser1 = (myData) => {
  return d3.csv.parse(myData).map(el => {
    let price = (parseFloat(el.open) + parseFloat(el.close)).toFixed(2) / 2;
    let date = d3.time.format("%Y-%m-%d %H:%M:%S").parse(el.timestamp);
    return { date, price }
  })
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