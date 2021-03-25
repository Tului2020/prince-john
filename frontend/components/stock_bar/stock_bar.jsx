import React from 'react';
import { Redirect } from 'react-router';
import { tripleDots } from './stock_bar_icon'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MiniGraphContainer from '../graph/mini_grapher';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})


class StockBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit() {
    // debugger
    console.log('clicked')
    return <Redirect to='/stocks/TSLA'/>
    // this.props.history.push(`/dashboard`);
  };

  displayStock(ticker, amount) {
    // debugger
    let {history} = this.props
    let price = 0;
    let percentChange = 0;

    if (Object.keys(history).includes(ticker)) {
      price = history[ticker][108].price
      let beginningPrice = history[ticker][0].price
      percentChange = (price - beginningPrice) / beginningPrice * 100 
    }


    return (
      <Link to={`/stocks/${ticker}`} key={ticker} className='link-to-stock-show'>
    
        <div className='display-stock' >
          <div className='stock-name-amount' >
            <div className='stock-name'>
              {ticker}
            </div>
            <div className='stock-amount'>
              {amount.toFixed(2)} Shares
            </div>
          </div>

          <div className='stock-graph' id={'stock-graph-' + ticker}>
            <MiniGraphContainer ticker={ticker} data={history[ticker]}/>
          </div>

          <div className='stock-price' id={'stock-price-' + ticker}>
            <div>{currencyFormatter.format(price)}</div>
            <div>{percentChange.toFixed(2)}%</div>
          </div>

        </div>

      </Link>
    )
  }


  render() {
    const { current_stocks } = this.props
    if (current_stocks) {
      return (
        <div id='stock-bar'>
          <div className='bottom-border'>
            <div id='stock-bar-title'>
              <div>
                Stocks
              </div>

              <div>
                {tripleDots}
              </div>
            </div>
          </div>


          <div id='owned-stocks' className='bottom-border'>
            {Object.keys(current_stocks).map(ticker => (
              this.displayStock(ticker, current_stocks[ticker])
            ))}


          </div>

          <div id='watch-list'>

          </div>

        </div>
      )
    }

    return null
  }


}


const mSTP = ({entities}) =>  ({
    current_stocks: entities.stocks.current_stocks,
    history: entities.history,
  })


const mDTP = (dispatch) => ({
  
})

const StockBarContainer = connect(mSTP, mDTP)(StockBar);
export default StockBarContainer;


