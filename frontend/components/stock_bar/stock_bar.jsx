import React from 'react';


class StockBar extends React.Component {

  render() {
    const { current_stocks, stock_history } = this.props.stocks
    console.log(current_stocks);
  

    return (
      <div>
        StockBar
        {/* {[current_stocks]} */}
        {/* {Object.keys(current_stocks)} */}
      </div>
    )
  }


}


export default StockBar;

