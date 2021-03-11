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
		this.state = { value: 'Shares', trade: 'Buy' };

		this.handleChange = this.handleChange.bind(this);
		this.changeTransactionType = this.changeTransactionType.bind(this);
	}

	handleChange(event) {
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




	componentWillMount() {
		this.userId = this.props.currentUser.id
		this.props.fetchUserStockInfo(this.userId);
	}


	render() {
		let stockAmount;

		if (this.props.current_stocks) {
			let pageTicker = this.props.ticker
			this.props.current_stocks.forEach(({ name, amount }) => {
				if (name === pageTicker) {
					stockAmount = amount
				}
			})
		}

		// debugger
		return (
			<div id="stock-show-market-bar">
				<div id="stock-show-market-bar-trade" className="bottom-border">
					<div className="stock-show-chosen-transaction" onClick={this.changeTransactionType} value="Buy">
						Buy {this.props.ticker}
					</div>

					<div onClick={this.changeTransactionType} value="Sell">
						Sell {this.props.ticker}
					</div>
					<div id="filler2"></div>
					<div>
						{downArrow}
					</div>
				</div>


				<div id="stock-show-market-bar-order" className="bottom-border">

					<div id="stock-show-market-bar-order-top" className="bottom-border">
						<div id="stock-show-invest-in">
							<div>Invest In</div>
							<div className="flex-end" >

								<select value={this.state.value} onChange={this.handleChange} id="stock-show-drop-down">
									<option value="shares">Shares</option>
									<option value="dollars">Dollars</option>
								</select>



							</div>
						</div>
						<div id="stock-show-shares">
							<div>Shares</div>
							<div className="flex-end">
								<input type="number" placeholder="0" id="stock-show-shares-input" />
							</div>
						</div>

						<div id="stock-show-market-price">
							<div id="stock-show-market-price-sub">Market Price</div>
							<div className="flex-end">

								{/* This is where the market price from API will go!!!!!!!!!! */}

							</div>
						</div>
					</div>

					<div id="stock-show-market-bar-order-bottom">
						<div id="stock-show-market-estimated-cost">
							<div>Estimated {(this.state.trade === 'Buy') ? ('Cost') : ('Credit')}</div>
							<div className="flex-end">$$$$</div>
						</div>
						<div id="stock-show-market-review-order">
							<button id="stock-show-market-review-order-button">Review Order</button>
						</div>


					</div>

				</div>




				<div id="stock-show-market-bar-buy-power">
					{(this.state.trade === 'Sell') ? (`${stockAmount} Shares Available`) :
						(`${currencyFormatter.format(this.props.currentUser.balance)} Buying Power Available`)}
				</div>
			</div>)
	}

}




const mSTP = (state, ownParams) => ({
	// ticker: ownParams.match.params.ticker,
	current_stocks: state.entities.stocks.current_stocks,
	currentUser: state.entities.users[state.session.currentUserId],
})

const mDTP = (dispatch) => ({
	fetchUserStockInfo: (userId) => dispatch(fetchUserStockInfo(userId))
})

const StockShowBarCotainer = connect(mSTP, mDTP)(StockShowBar);

export default StockShowBarCotainer
