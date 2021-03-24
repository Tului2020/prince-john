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
        <div className="stock-show-chosen-transaction" onClick={this.changeTransactionType} value="Buy" >
          Buy {ticker}
        </div >
        {Object.keys(current_stocks).includes(ticker) ?
          (<div onClick={this.changeTransactionType} value="Sell"> Sell {ticker}</div>) : (<div></div>)}

        {/* <div id="filler2"></div> */}
        <div>
          {downArrow}
        </div>
      </>)
  }

  componentTwo() {
    return (
      <div id="stock-show-market-bar-order-top">
        <div id="stock-show-invest-in">
          <div>Invest In</div>
          <div className="flex-end" >

            <select value={this.state.value} onChange={this.handleChange} id="stock-show-drop-down">
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

  componentSix() {
    return (
        // <div id="stock-show-market-review-order">
          <button id="stock-show-market-review-order-button">Review Order</button>
        // </div>
    )
  }

  componentSeven(stockAmount) {
    return (    		
      <div id="stock-show-market-bar-buy-power">
        {(this.state.trade === 'Sell')? 
          (`${stockAmount? stockAmount : 0} Shares Available -  Sell All`) :
          (`${currencyFormatter.format(this.props.currentUser.balance)} Buying Power Available`)}
      </div>)
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
        <div id='stock-show-market-bar-button'>{this.componentSix()}</div>
        <div className='stock-show-market-bar-comp top-border'>{this.componentSeven(stockAmount)}</div>
      </div>
    )


    // debugger
    // return (







    // 		</div>





    // 	</div>)
  }

}




const mSTP = ({ entities, session }) => ({
  current_stocks: entities.stocks.current_stocks,
  currentUser: entities.users[session.currentUserId],
  history: entities.history,
})

const mDTP = (dispatch) => ({
  fetchUserStockInfo: (userId) => dispatch(fetchUserStockInfo(userId))
})

const StockShowBarCotainer2 = connect(mSTP, mDTP)(StockShowBar);

export default StockShowBarCotainer2
