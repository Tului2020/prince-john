export const GET_USER_STOCKS = 'GET_USER_STOCKS';
export const NEW_USER_STOCK = 'NEW_USER_STOCK'
import * as SessionApiUtil from '../util/session_api_util';
import { fetchUserInfo } from './session_actions';


const getUserStocks = (stockInfo) => ({
  type: GET_USER_STOCKS,
  stockInfo
})

export const fetchUserStockInfo = (userId) => dispatch => (
  SessionApiUtil.fetchUserStockInfo(userId)
    .then(stockInfo => {
      dispatch(getUserStocks(stockInfo))})
) 

export const updateUserStockInfo = (userId, ticker, amount, unit_price) => dispatch => (
  SessionApiUtil.updateUserStockInfo(userId, ticker, amount, unit_price).then(() => {
    // debugger

    dispatch(fetchUserStockInfo(userId))
    dispatch(fetchUserInfo(userId))
  })
)
