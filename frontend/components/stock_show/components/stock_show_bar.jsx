import React from 'react';
import { connect } from 'react-redux';
import { fetchUserStockInfo } from '../../../actions/stock_actions';
import { downArrow } from './../stock_show_icons';

const currencyFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2
})



class StockShowBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: 'Shares', trade: 'Buy', amountToTrade: '' };
		this.updateTradeAmount = this.updateTradeAmount.bind(this);
		this.valueChange = this.valueChange.bind(this);
		this.changeTransactionType = this.changeTransactionType.bind(this);
		this.reviewOrderAction = this.reviewOrderAction.bind(this)
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

	UNSAFE_componentWillMount() {
		this.userId = this.props.currentUser.id
		this.props.fetchUserStockInfo(this.userId);
	}

	updateTradeAmount(e) {
		this.setState({ amountToTrade: e.target.value })
	}

	componentOne(current_stocks, ticker) {
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

	componentFour(stockPrice) {
		return (
			<>
				{(this.state.value === 'Shares') ?
					(
						<div className='stock-show-market-bar-comp'>
							<div id="stock-show-market-price">
								<div id="stock-show-market-price-sub">Market Price</div>
								<div>{currencyFormatter.format(stockPrice)}</div>
							</div></div>) : (null)
				}
			</>
		)
	}

	componentFive(stockPrice) {
		return (
			<div id="stock-show-market-estimated-cost">
				<div>
					{(this.state.value === 'Shares') ? (
						`Estimated ${(this.state.trade === 'Buy') ? ('Cost') : ('Credit')}`) :
						(`Est.Quantity`)}

				</div>
				<div>
					{(this.state.value === 'Shares') ?
						(currencyFormatter.format(stockPrice * this.state.amountToTrade)) :
						(this.state.amountToTrade / stockPrice).toFixed(3)}

				</div>
			</div>
		)

	}

	componentSix(stockPrice, stockAmount) {
		return (
			<button id="stock-show-market-review-order-button" onClick={() => this.reviewOrderAction(stockPrice, stockAmount)}>Review Order</button>
		)
	}

	componentSeven(stockAmount) {
		return (
			<div id="stock-show-market-bar-buy-power">
				{(this.state.trade === 'Sell') ?
					(`${stockAmount ? stockAmount : 0} Shares Available -  Sell All`) :
					(`${currencyFormatter.format(this.props.currentUser.balance)} Buying Power Available`)}
			</div>)
	}



	reviewOrderAction(stockPrice, stockAmount) {
		// debugger
		switch (this.state.trade) {
			case 'Buy':
				let estimatedCost;
				let balance = parseFloat(this.props.currentUser.balance)

				if (this.state.value === 'Shares') {
					estimatedCost = parseFloat((stockPrice * this.state.amountToTrade).toFixed(2))
				} else {
					estimatedCost = parseFloat(this.state.amountToTrade)
				}
				

				if (estimatedCost > balance) {
					this.displayBuyError(stockPrice, stockAmount);				
				} else {
					// this.displaySuccess();
				}

				return

			case 'Sell':
				let sharesToSell;

				if (this.state.value === 'Shares') {
					sharesToSell = this.state.amountToTrade;
				} else {
					sharesToSell = this.state.amountToTrade / stockPrice
				}

				let creditBack = sharesToSell * stockPrice
				if (stockAmount < sharesToSell) {
					this.displaySellError(stockAmount, stockPrice, creditBack);
				} else {
					this.displaySuccessSell(stockPrice, stockAmount, creditBack);
				}
				return
		}
	}

	displaySellError(stockAmount, stockPrice, creditBack) {
		let htmlElement = document.getElementById('stock-show-market-bar-button')
		while (htmlElement.firstChild) htmlElement.firstChild.remove()

		let firstMessage = document.createElement('div')
		firstMessage.classList.add('bold-font')

		let secondMessage = document.createElement('div')

		let backButton = document.createElement('button')
		backButton.id = 'stock-show-market-review-order-button'
		backButton.innerHTML = 'Back'
		backButton.onclick = () => {
			while (htmlElement.firstChild) htmlElement.firstChild.remove()
			let reviewOrderButton = document.createElement('button')
			reviewOrderButton.id = 'stock-show-market-review-order-button'
			reviewOrderButton.innerHTML = 'Review Order'
			reviewOrderButton.onclick = () => {this.reviewOrderAction(stockPrice, stockAmount)}
			htmlElement.appendChild(reviewOrderButton)
		}

		if (this.state.value === 'Shares') {
			firstMessage.innerHTML = 'Not Enough Shares'
			secondMessage.innerHTML = `You can only sell up to ${stockAmount} shares of ${this.props.ticker}`
		} else {
			firstMessage.innerHTML = 'Not Enough Invested'
			secondMessage.innerHTML = `You currently only own ${currencyFormatter.format(stockPrice * stockAmount)} of ${this.props.ticker} which means you cannot sell ${currencyFormatter.format(creditBack)}. Instead, you can sell all your shares.`
		}

		htmlElement.appendChild(firstMessage)
		htmlElement.appendChild(secondMessage)
		htmlElement.appendChild(backButton)
	}


	displayBuyError(stockPrice, stockAmount) {
		let htmlElement = document.getElementById('stock-show-market-bar-button')
		while (htmlElement.firstChild) htmlElement.firstChild.remove()
		
		let firstMessage = document.createElement('div')
		firstMessage.classList.add('bold-font')

		let secondMessage = document.createElement('div')

		let depositFundsButton = document.createElement('button')
		depositFundsButton.id = 'stock-show-market-review-order-button'
		depositFundsButton.innerHTML = 'Deposit Funds'

		let dismissButton = document.createElement('button')
		dismissButton.id = 'stock-show-market-review-order-button'
		dismissButton.innerHTML = 'Dismiss'

		dismissButton.onclick = () => {
			while (htmlElement.firstChild) htmlElement.firstChild.remove()
			let reviewOrderButton = document.createElement('button')
			reviewOrderButton.id = 'stock-show-market-review-order-button'
			reviewOrderButton.innerHTML = 'Review Order'
			reviewOrderButton.onclick = () => {this.reviewOrderAction(stockPrice, stockAmount)}
			htmlElement.appendChild(reviewOrderButton)
		}

		firstMessage.innerHTML = 'Not Enough Buying Power'
		secondMessage.innerHTML = `You don’t have enough buying power for this order.`

		htmlElement.appendChild(firstMessage)
		htmlElement.appendChild(secondMessage)
		htmlElement.appendChild(depositFundsButton)
		htmlElement.appendChild(dismissButton)
	}



	displaySuccessSell(stockPrice, stockAmount, creditBack) {
		let htmlElement = document.getElementById('stock-show-market-bar-button')
		while (htmlElement.firstChild) htmlElement.firstChild.remove()

		let firstMessage = document.createElement('div')

		let sellButton = document.createElement('button')
		sellButton.id = 'stock-show-market-review-order-button'
		sellButton.innerHTML = 'Sell'

		let editButton = document.createElement('button')
		editButton.id = 'stock-show-market-review-order-button'
		editButton.innerHTML = 'Edit'

		editButton.onclick = () => {
			while (htmlElement.firstChild) htmlElement.firstChild.remove()
			let reviewOrderButton = document.createElement('button')
			reviewOrderButton.id = 'stock-show-market-review-order-button'
			reviewOrderButton.innerHTML = 'Review Order'
			reviewOrderButton.onclick = () => {this.reviewOrderAction(stockPrice, stockAmount)}
			htmlElement.appendChild(reviewOrderButton)
		}

		if (this.state.value === 'Shares') {
			firstMessage.innerHTML = `You are placing a good for day limit order to sell ${this.props.amountToTrade} shares of ${this.props.ticker}. Your pending order will execute at ${currencyFormatter.format(stockPrice)} per share`

		} else {
			let shares = (this.state.amountToTrade / stockPrice).toFixed(4)
			firstMessage.innerHTML = `You are placing a good for day market order to sell ${this.state.amountToTrade} of ${this.props.ticker} based on the current market price of ${currencyFormatter.format(stockPrice)}. You will sell approximately ${shares} shares.`
		}

		htmlElement.appendChild(firstMessage)
		htmlElement.appendChild(sellButton)
		htmlElement.appendChild(editButton)
	}



	render() {
		let stockAmount = 0;
		let stockPrice = 0;
		let { current_stocks, ticker, history } = this.props
		// debugger


		if (history[ticker]) {
			stockAmount = current_stocks[ticker];
			stockPrice = history[ticker][108].price
			// debugger
		}

		return (
			<div id="stock-show-market-bar">
				<div className='stock-show-market-bar-comp bottom-border bold-font'>{this.componentOne(current_stocks, ticker)}</div>
				<div className='stock-show-market-bar-comp'>{this.componentTwo()}</div>
				<div className='stock-show-market-bar-comp'>{this.componentThree()}</div>
				{this.componentFour(stockPrice)}
				<div className='stock-show-market-bar-comp top-border bold-font'>{this.componentFive(stockPrice)}</div>
				<div id='stock-show-market-bar-button'>{this.componentSix(stockPrice, stockAmount)}</div>
				<div className='stock-show-market-bar-comp top-border'>{this.componentSeven(stockAmount)}</div>
			</div>
		)
	}
}




const mSTP = ({ entities, session }) => ({
	current_stocks: entities.stocks.current_stocks,
	currentUser: entities.users[session.currentUserId],
	history: entities.history,
	// balance: entities
})

const mDTP = (dispatch) => ({
	fetchUserStockInfo: (userId) => dispatch(fetchUserStockInfo(userId))
})

const StockShowBarCotainer = connect(mSTP, mDTP)(StockShowBar);

export default StockShowBarCotainer
