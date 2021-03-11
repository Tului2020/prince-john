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

  displayStock(name, amount) {
    // debugger
    return (
      <Link to={`/stocks/${name}`} key={name} className='link-to-stock-show'>
    
        <div className='display-stock' >
          <div className='stock-name-amount' >
            <div className='stock-name'>
              {name}
            </div>
            <div className='stock-amount'>
              {amount} Shares
            </div>
          </div>

          <div className='stock-graph' id={'stock-graph-' + name}>

          </div>

          <div className='stock-price' id={'stock-price-' + name}>

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
            {Object.keys(current_stocks).map(name => (
              this.displayStock(name, current_stocks[name])
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


