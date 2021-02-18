import React from 'react';


class StockBar extends React.Component {

  render() {
    
    if (this.props.stocks.current_stocks) {
      debugger
      const { current_stocks, stock_history } = this.props.stocks
      return (
        <div>
          StockBar
          <br/>
          {current_stocks.TSLA}
          {/* {Object.keys(current_stocks)} */}
        </div>
      )
    } else {
      return null
    }
  }


}


export default StockBar;

