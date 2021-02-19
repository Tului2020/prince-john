import React from 'react';


class StockBar extends React.Component {

  render() {
    if (this.props.stocks.current_stocks) {
      const { current_stocks, stock_history } = this.props.stocks
      return (
        <div id='stock-bar'>
          <div id='stock-bar-title'>
            Stock
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

