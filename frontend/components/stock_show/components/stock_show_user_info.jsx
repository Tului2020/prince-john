import React from 'react';
import { connect } from 'react-redux';
import { fetchUserStockInfo } from '../../../actions/stock_actions';


const currencyFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2
})



class StockShowUserInfo extends React.Component {

	statusCalculator() {
		let {stock_history, ticker, current_stocks} = this.props;
		
		let stockAvgCost = 0;
		let stockPortDiversity = 0;
		let stockMarketValue = 0;
		let stockTotalCost = 0;
		let stockTodayReturn = 0;
		let stockTotalReturn = 0;

		if (!stock_history) return {stockAvgCost, stockPortDiversity, stockMarketValue, stockTotalCost, stockTodayReturn, stockTotalReturn }



		Object.keys(stock_history).forEach(stock_info => {
			let stock = stock_history[stock_info]
			
			if (stock.ticker === ticker) {	
				stockTotalCost += (stock.amount * stock.unit_price);



			}
		})

		stockAvgCost = currencyFormatter.format(stockTotalCost / current_stocks[ticker])
		stockTotalCost = currencyFormatter.format(stockTotalCost)



		return { stockAvgCost, stockPortDiversity, stockMarketValue, stockTotalCost, stockTodayReturn, stockTotalReturn }
	}





	marketValueDiv(stockMarketValue, stockTotalCost, stockTodayReturn, stockTotalReturn) {
		return (
			<>
				<div id="stock-show-user-info-market-value-header">Your Market Value</div>
				<div id="stock-show-user-info-market-value-amount">{stockMarketValue}</div>
				<div id="stock-show-user-info-market-value-cost" className='bottom-border'>
					<div>Cost</div>
					<div>{stockTotalCost}</div>
				</div>
				<div id="stock-show-user-info-market-value-today-return" className='bottom-border'>
					<div>Today's Return</div>
					<div>{stockTodayReturn}</div>
				</div>
				<div id="stock-show-user-info-market-value-total-return">
					<div>Total Return</div>
					<div>{stockTotalReturn}</div>
				</div>
			</>
		)
	}


	avgCostDiv(stockAvgCost, stockPortDiversity) {
		let shares;

		if (!this.props.current_stocks) {
			shares = 0
		} else {
			shares = this.props.current_stocks[this.props.ticker]
		}

		return (
			<>
				<div id="stock-show-user-info-avg-cost-header">Your Average Cost</div>
				<div id="stock-show-user-info-avg-cost-amount">{stockAvgCost}</div>
				<div id="stock-show-user-info-avg-cost-shares" className='bottom-border'>
					<div>Shares</div>
					<div>{shares}</div>
				</div>
				<div id="stock-show-user-info-avg-cost-today-return">
					<div>Portfolio Diversity</div>
					<div>{stockPortDiversity}</div>
				</div>
				<div></div>
			</>
		)
	}





	render() {
		let { stockAvgCost, stockPortDiversity, stockMarketValue, stockTotalCost, stockTodayReturn, stockTotalReturn } = this.statusCalculator();
		// debugger
		return (
			<>
				<div id="stock-show-user-info-market-value">
					{this.marketValueDiv(stockMarketValue, stockTotalCost, stockTodayReturn, stockTotalReturn)}
				</div>

				<div id="stock-show-user-info-avg-cost">
					{this.avgCostDiv(stockAvgCost, stockPortDiversity)}
				</div>


			</>)
	}


}



const mSTP = ({entities, session}) => ({
	current_stocks: entities.stocks.current_stocks,
	current_user: entities.users[session.currentUserId],
	stock_history: entities.stocks.stock_history,
})

const mDTP = (dispatch) => ({
	fetchUserStockInfo: (userId) => dispatch(fetchUserStockInfo(userId))
})

const StockShowUserInfoContainer = connect(mSTP, mDTP)(StockShowUserInfo);

export default StockShowUserInfoContainer
