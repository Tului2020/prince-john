export const GET_USER_STOCKS = 'GET_USER_STOCKS';
import * as SessionApiUtil from '../util/session_api_util';


const getUserStocks = (stockInfo) => ({
  type: GET_USER_STOCKS,
  stockInfo
})

export const fetchUserStockInfo = (userId) => dispatch => (
  SessionApiUtil.fetchUserStockInfo(userId)
    .then(stockInfo => {
      // debugger
      dispatch(getUserStocks(stockInfo))})
) 


