import React from 'react';
import { tripleDots } from './stock_bar_icon'

class StockBar extends React.Component {

  render() {
    if (this.props.stocks.current_stocks) {
      const { current_stocks, stock_history } = this.props.stocks
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


          <div id='owned-stocks'>
            Stonks!!
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

