import React from 'react';
import { tripleDots } from './stock_bar_icon'

class StockBar extends React.Component {

  displayStock(stock) {
    return (
      <div className='display-stock'>
        <div className='stock-name-amount'>
          <div>
            {stock.name}
          </div>
          <div>
            {stock.amount}
          </div>
        </div>

        <div className='stock-graph'>

        </div>

        <div className='stock-price'>

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
            {/* {this.displayStock(current_stocks[0])}
            {this.displayStock(current_stocks[1])}
            {this.displayStock(current_stocks[2])} */}
            {/* {console.log(this.displayStock(current_stocks[2]))} */}

            {console.log(current_stocks[0])}


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

