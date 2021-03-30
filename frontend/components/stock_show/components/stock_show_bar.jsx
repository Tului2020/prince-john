import React from 'react';
import { connect } from 'react-redux';
import { addBalance } from '../../../actions/session_actions';
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
		this.state = { value: 'Shares', trade: 'Buy', amountToTrade: '', stockUnitPrice: 0, infoSet: false, errors: null };


		// all bindings
		this.updateTradeAmount = this.updateTradeAmount.bind(this);
		this.changeTransactionType = this.changeTransactionType.bind(this);
		this.reviewOrderAction = this.reviewOrderAction.bind(this);
		this.depositMissingFunds = this.depositMissingFunds.bind(this);
		this.sellAllAction = this.sellAllAction.bind(this);
	}

	// valueChange(event) {
	// 	this.setState({ value: event.target.value });
	// }


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
		let { ticker, history } = this.props

		if (history[ticker] && !this.state.infoSet) {
			this.setState({
				stockUnitPrice: history[ticker][108].price,
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
				<div className={`${(this.state.trade === 'Buy') ? ('stock-show-chosen-transaction ') : ('')}cursor-pointer`} onClick={this.changeTransactionType} value="Buy" >
					Buy {ticker}
				</div >
				{Object.keys(current_stocks).includes(ticker) ?
					(<div className={`${(this.state.trade === 'Sell') ? ('stock-show-chosen-transaction ') : ('')}cursor-pointer`} onClick={this.changeTransactionType} value="Sell"> Sell {ticker}</div>) : (<div></div>)}

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
						<select value={this.state.value} onChange={(event) => this.setState({ value: event.target.value })} id="stock-show-drop-down">
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
		let { amountToTrade, stockUnitPrice, trade, value, errors } = this.state
		let { ticker, current_stocks} = this.props
		let stockAmountOwned = current_stocks[ticker]

		// let balance = parseFloat(this.props.currentUser.balance)
		amountToTrade = parseFloat(amountToTrade)

		if (!current_stocks[ticker]) {
			return (<div>{`${ticker} is not supported by PrinceJohn`}</div>)
		}



		if (errors === null) {
			return (
				<div><button id="stock-show-market-review-order-button" onClick={this.reviewOrderAction}>Review Order</button></div>
			)
		} else if (!errors) {
			let shares = (value === 'Shares') ? (amountToTrade) : (amountToTrade / stockUnitPrice)
			if (trade === 'Sell') shares = -shares

			return (
				<>
					<div>{`You are placing a good for day market order to ${trade.toLowerCase()} ${Math.abs(shares.toFixed(3))} shares of ${ticker}.`}</div>
					<div><button id="stock-show-market-review-order-button" onClick={() => this.buySellStock(shares)}>{trade}</button></div>
					<div><button id="stock-show-market-review-order-button" onClick={() => this.setState({errors: null, amountToTrade: ''})}>Edit</button></div>
				</>
			)
		} else {

			let firstMessage;
			let secondMessage;
			let depositFundsButton;

			if (trade === 'Sell') {
				firstMessage = 'Not Enough Shares'
				secondMessage = `You can only sell up to ${stockAmountOwned.toFixed(3)} shares of ${ticker}.`
				depositFundsButton = null
			} else {
				firstMessage = 'Not Enough Buying Power'
				secondMessage = `Please Deposit More Funds`
				depositFundsButton = (<div><button id="stock-show-market-review-order-button" onClick={this.depositMissingFunds}>Deposit Missing Funds</button></div>)
			}


			return (
				<>
					<div className='bold-font'>{firstMessage}</div>
					<div>{secondMessage}</div>
					{depositFundsButton}
					<div><button id="stock-show-market-review-order-button" onClick={() => this.setState({errors: null})}>Back</button></div>
				</>
			)
		}
	}

	depositMissingFunds() {
		let { currentUser } = this.props
		let { amountToTrade, value, stockUnitPrice } = this.state

		let moneyNeeded = (value==='Dollars') ? (amountToTrade) : (amountToTrade * stockUnitPrice)
		let missingFunds = moneyNeeded - parseFloat(currentUser.balance)
		debugger
		this.props.addBalance(currentUser.id, missingFunds)
		this.setState({errors: null})
	}


	componentSeven() {
		let { ticker, current_stocks, currentUser} = this.props
		let { trade } = this.state
		let stockAmountOwned = current_stocks[ticker]

		if (trade === 'Sell') {
			return (
				<div id="stock-show-market-bar-buy-power">
					{`${stockAmountOwned.toFixed(3)} Shares Available - `}
					<div className='cursor-pointer' onClick={this.sellAllAction}>Sell All</div>
				</div>
			)
		} else {
			return (
				<div id="stock-show-market-bar-buy-power">
					{`${currencyFormatter.format(currentUser.balance)} Buying Power Available`}
				</div>
			)
		}

	}

	sellAllAction() {
		// debugger
		let { value, stockUnitPrice } = this.state;
		let { current_stocks, ticker } = this.props;
		let sharesAmount = current_stocks[ticker]

		if (value === 'Shares') {
			this.setState({amountToTrade: sharesAmount})
		} else {
			this.setState({amountToTrade: sharesAmount * stockUnitPrice})
		}
	}


	reviewOrderAction() {
		let { amountToTrade, stockUnitPrice, trade, value } = this.state
		let { ticker, current_stocks} = this.props
		let stockAmountOwned = current_stocks[ticker]
		if (!parseFloat(amountToTrade)) return
		// debugger

		let balance = parseFloat(this.props.currentUser.balance)
		amountToTrade = parseFloat(amountToTrade)

		if (trade === 'Buy') {
			if (value === 'Shares') {
				(stockUnitPrice * amountToTrade <= balance) ? this.setState({ errors: false }) : this.setState({ errors: true })
			} else {
				(amountToTrade <= balance) ? this.setState({ errors: false }) : this.setState({ errors: true })
			}


		} else {
			if (value === 'Shares') {
				(amountToTrade <= stockAmountOwned) ? this.setState({ errors: false }) : this.setState({ errors: true })
			} else {
				(amountToTrade / stockUnitPrice <= stockAmountOwned) ? this.setState({ errors: false }) : this.setState({ errors: true })
			}
		}
		// debugger
	}

	buySellStock(shares) {
		let userId = this.props.currentUser.id
		let { ticker, current_stocks } = this.props
		let { stockUnitPrice } = this.state

		this.props.updateUserStockInfo(userId, ticker, shares, stockUnitPrice)
		this.setState({errors: null, amountToTrade: ''})
		if (shares + current_stocks[ticker] === 0) {
			this.setState({trade: 'Buy'})
		}
	}


	render() {
		// console.log(this.state.errors)
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
	updateUserStockInfo: (userId, ticker, amount, unitPrice) => dispatch(updateUserStockInfo(userId, ticker, amount, unitPrice)),
	addBalance: (userId, depositAmount) => dispatch(addBalance(userId, depositAmount))
})


const StockShowBarCotainer = connect(mSTP, mDTP)(StockShowBar);

export default StockShowBarCotainer
