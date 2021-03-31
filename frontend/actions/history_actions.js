import getIntraDay from "../util/alphavantage_api"
import { getIntraDayFromDB, updateIntraDayDB } from "../util/session_api_util"
import * as d3 from 'd3';

export const STOCK_HISTORY = 'STOCK_HISTORY'
export const STOCK_HISTORY_LOCAL = 'STOCK_HISTORY_LOCAL'

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

  

  return {date: retArr[108].date, history: retArr.map(el => el.price).toString()}
}



const receiveStockHistory = (stockHistory, ticker) => ({
  type: STOCK_HISTORY,
  stockHistory,
  ticker
})

const receiveStockHistoryLocal = stockHistory => ({
  type: STOCK_HISTORY_LOCAL,
  stockHistory
})


export const getIntraDayThunk = ticker => dispatch => {
  getIntraDayFromDB(ticker)
    .then(data => {
      if (data.ticker) {
        if ((new Date() - new Date(data.date)) / 3600000 < 30) {
          dispatch(receiveStockHistoryLocal(data))
          return
        }
      }
      
      getIntraDay(ticker)
        .then(({ data, config }) =>{ 
          dispatch(receiveStockHistory(data, config.params.symbol))
          let x = dataParser(data)
          updateIntraDayDB(config.params.symbol, x.date, x.history)
        })
    })



}