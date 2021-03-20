import getIntraDay from "../util/alphavantage_api"


export const STOCK_HISTORY = 'STOCK_HISTORY'


const receiveStockHistory = (stockHistory, ticker) => ({
  type: STOCK_HISTORY,
  stockHistory,
  ticker
})

export const getIntraDayThunk = ticker => dispatch => (
  getIntraDay(ticker).then(({data, config}) => dispatch(receiveStockHistory(data, config.params.symbol)))
)
