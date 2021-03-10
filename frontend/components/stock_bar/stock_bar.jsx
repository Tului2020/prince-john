import React from 'react';
import { Redirect } from 'react-router';
import { tripleDots } from './stock_bar_icon'

class StockBar extends React.Component {

  displayStock(stock) {
    // debugger
    return (
      <div key={stock.name}>

        <div className='display-stock' >
          <div className='stock-name-amount' >
            <div className='stock-name'>
              {stock.name}
            </div>
            <div className='stock-amount'>
              {stock.amount} Shares
            </div>
          </div>

          <div className='stock-graph' id={'stock-graph-' + stock.name}>

          </div>

          <div className='stock-price' id={'stock-price-' + stock.name}>

          </div>

        </div>

      </div>
    )
  }


  render() {
    if (this.props.stocks.current_stocks) {
      const { current_stocks } = this.props.stocks
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
            {current_stocks.map(stock => (
              this.displayStock(stock)
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


export default StockBar;

