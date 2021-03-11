import React from 'react';
import { connect } from 'react-redux';
import { fetchUserStockInfo } from '../../../actions/stock_actions';



class StockShowUserInfo extends React.Component {





	marketValueDiv() {
		return (
			<>
				<div id="stock-show-user-info-market-value-header">Your Market Value</div>
				<div id="stock-show-user-info-market-value-amount">Amount needs to go here</div>
				<div id="stock-show-user-info-market-value-cost" className='bottom-border'>
					<div>Cost</div>
					<div>Cost  here!!!</div>
				</div>
				<div id="stock-show-user-info-market-value-today-return" className='bottom-border'>
					<div>Today's Return</div>
					<div>Return amount here!!</div>
				</div>
				<div id="stock-show-user-info-market-value-total-return">
					<div>Total Return</div>
					<div>Return amount here!!</div>
				</div>
			</>
		)
	}


	avgCostDiv() {
		let shares;
		if (!this.props.current_stocks) {
			shares = 0
		} else {
			shares = this.props.current_stocks[this.props.ticker]
		}

		return (
			<>
				<div id="stock-show-user-info-avg-cost-header">Your Average Cost</div>
				<div id="stock-show-user-info-avg-cost-amount">$$ needs to go here</div>
				<div id="stock-show-user-info-avg-cost-shares" className='bottom-border'>
					<div>Shares</div>
					<div>{shares}</div>
				</div>
				<div id="stock-show-user-info-avg-cost-today-return">
					<div>Portfolio Diversity</div>
					<div>% here!!!</div>
				</div>
				<div></div>
			</>
		)
	}





	render() {
		return (
			<>
				<div id="stock-show-user-info-market-value">
					{this.marketValueDiv()}
				</div>

				<div id="stock-show-user-info-avg-cost">
					{this.avgCostDiv()}
				</div>


			</>)
	}


}



const mSTP = state => ({
	current_stocks: state.entities.stocks.current_stocks,
	current_user: state.entities.users[state.session.currentUserId],
})

const mDTP = (dispatch) => ({
	fetchUserStockInfo: (userId) => dispatch(fetchUserStockInfo(userId))
})

const StockShowUserInfoContainer = connect(mSTP, mDTP)(StockShowUserInfo);

export default StockShowUserInfoContainer
