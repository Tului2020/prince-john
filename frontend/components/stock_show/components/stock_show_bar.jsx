import React from 'react';
import { connect } from 'react-redux';
import { fetchUserStockInfo, updateUserStockInfo } from '../../../actions/stock_actions';
import { downArrow } from './../stock_show_icons';


const currencyFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2
})



class StockShowBar extends React.Component {
	constructor(props) {
		super(props);
		// declaring state
		this.state = { value: 'Shares', trade: 'Buy', amountToTrade: '', stockUnitPrice: 0, stockAmountOwned: 0, infoSet: false };


		// all bindings
		this.updateTradeAmount = this.updateTradeAmount.bind(this);
		this.valueChange = this.valueChange.bind(this);
		this.changeTransactionType = this.changeTransactionType.bind(this);
	}

	valueChange(event) {
		this.setState({ value: event.target.value });
	}

	changeTransactionType(e) {
		document.getElementsByClassName('stock-show-chosen-transaction')[0].classList.remove('stock-show-chosen-transaction')
		e.target.classList.add('stock-show-chosen-transaction')
		if (e.target.innerHTML.split(' ')[0] === 'Buy') {
			this.setState({ trade: 'Buy' })
		} else {
			this.setState({ trade: 'Sell' })
		}
	}


	componentDidUpdate() {
		let { current_stocks, ticker, history } = this.props
		// debugger


		if (history[ticker] && !this.state.infoSet) {
			this.setState({
				stockUnitPrice: history[ticker][108].price,
				stockAmountOwned: current_stocks[ticker],
				infoSet: true
			})
		}
	}


	UNSAFE_componentWillMount() {
		this.userId = this.props.currentUser.id
		this.props.fetchUserStockInfo(this.userId);
	}

	updateTradeAmount(e) {
		this.setState({ amountToTrade: e.target.value })
	}

	componentOne() {
		let { current_stocks, ticker } = this.props
		return (
			<>
				<div className={`${(this.state.trade === 'Buy')? ('stock-show-chosen-transaction ') : (null)}cursor-pointer`} onClick={this.changeTransactionType} value="Buy" >
					Buy {ticker}
				</div >
				{Object.keys(current_stocks).includes(ticker) ?
					(<div className={`${(this.state.trade === 'Sell')? ('stock-show-chosen-transaction ') : (null)}cursor-pointer`} onClick={this.changeTransactionType} value="Sell"> Sell {ticker}</div>) : (<div></div>)}

				{/* <div id="filler2"></div> */}
				<div className="cursor-pointer">
					{downArrow}
				</div>
			</>)
	}

	componentTwo() {
		return (
			<div id="stock-show-market-bar-order-top">
				<div id="stock-show-invest-in">
					<div>Invest In</div>
					<div>
						<select value={this.state.value} onChange={this.valueChange} id="stock-show-drop-down">
							<option value="Shares">Shares</option>
							<option value="Dollars">Dollars</option>
						</select>
					</div>
				</div>
			</div>
		)
	}

	componentThree() {
		let isShares = (this.state.value === 'Shares')

		return (
			<div id="stock-show-shares">
				<div>{(isShares) ? (`Shares`) : (`Amount`)}</div>
				<input type="number" placeholder={(isShares) ? (`0`) : (currencyFormatter.format(0))} id="stock-show-shares-input" value={this.state.amountToTrade} onChange={this.updateTradeAmount} />
			</div>
		)
	}

	componentFour() {
		let { stockUnitPrice } = this.state

		return (
			<>
				{(this.state.value === 'Shares') ?
					(
						<div className='stock-show-market-bar-comp'>
							<div id="stock-show-market-price">
								<div id="stock-show-market-price-sub">Market Price</div>
								<div>{currencyFormatter.format(stockUnitPrice)}</div>
							</div></div>) : (null)
				}
			</>
		)
	}

	componentFive() {
		let { stockUnitPrice } = this.state
		return (
			<div id="stock-show-market-estimated-cost">
				<div>
					{(this.state.value === 'Shares') ? (
						`Estimated ${(this.state.trade === 'Buy') ? ('Cost') : ('Credit')}`) :
						(`Est.Quantity`)}

				</div>
				<div>
					{(this.state.value === 'Shares') ?
						(currencyFormatter.format(stockUnitPrice * this.state.amountToTrade)) :
						(this.state.amountToTrade / stockUnitPrice).toFixed(3)}

				</div>
			</div>
		)

	}

	componentSix() {
		return (
			<button id="stock-show-market-review-order-button">Review Order</button>
		)
	}

	componentSeven() {
		let { stockAmountOwned } = this.state
		return (
			<div id="stock-show-market-bar-buy-power">
				{(this.state.trade === 'Sell') ?
					(`${stockAmountOwned} Shares Available -  Sell All`) :
					(`${currencyFormatter.format(this.props.currentUser.balance)} Buying Power Available`)}
			</div>)
	}





	render() {
		return (
			<div id="stock-show-market-bar">
				<div className='stock-show-market-bar-comp bottom-border bold-font'>{this.componentOne()}</div>
				<div className='stock-show-market-bar-comp'>{this.componentTwo()}</div>
				<div className='stock-show-market-bar-comp'>{this.componentThree()}</div>
				{this.componentFour()}
				<div className='stock-show-market-bar-comp top-border bold-font'>{this.componentFive()}</div>
				<div id='stock-show-market-bar-button'>{this.componentSix()}</div>
				<div className='stock-show-market-bar-comp top-border'>{this.componentSeven()}</div>
			</div>
		)
	}
}




const mSTP = ({ entities, session }) => ({
	current_stocks: entities.stocks.current_stocks,
	currentUser: entities.users[session.currentUserId],
	history: entities.history,
})

const mDTP = (dispatch) => ({
	fetchUserStockInfo: (userId) => dispatch(fetchUserStockInfo(userId)),
	updateUserStockInfo: (userId, ticker, amount, unitPrice) => dispatch(updateUserStockInfo(userId, ticker, amount, unitPrice))
})

const StockShowBarCotainer = connect(mSTP, mDTP)(StockShowBar);

export default StockShowBarCotainer
