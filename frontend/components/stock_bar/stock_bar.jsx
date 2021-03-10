import React from 'react';
import { Redirect, useHistory } from 'react-router';
import { tripleDots } from './stock_bar_icon'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';




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

  displayStock(stock) {
    // debugger
    return (
      <Link to='/stocks/TSLA' key={stock.name} className='link-to-stock-show'>
    
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

      </Link>
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


const mSTP = (state) =>  ({
    stocks: state.entities.stocks
  })


const mDTP = (dispatch) => ({
  
})

const StockBarContainer = connect(mSTP, mDTP)(StockBar);
export default StockBarContainer;


