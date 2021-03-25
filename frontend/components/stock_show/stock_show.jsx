import React from 'react';
import GraphContainer from '../graph/grapher';
import searchFunction from '../nav_bar/logged_in/components/searchbar_components/search_function';
import LoggedInNavBarContainer from '../nav_bar/logged_in/nav_bar_logged_in_container';
import StockShowBarCotainer from './components/stock_show_bar';
import StockShowUserInfoContainer from './components/stock_show_user_info';

const currencyFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2
})


class StockShow extends React.Component {
  render() {
    let { ticker, history } = this.props

    let displayPrice;// = (history[ticker])? (currencyFormatter.format(endPrice)) : (`$0.00`)
    let displayReturn;// = (history[ticker])? (currencyFormatter.format(beginningPrice)) : (`$0.00`)
    let endPrice;
    let beginningPrice;

    if (history[ticker]) {
      endPrice = history[ticker][108].price;
      beginningPrice = history[ticker][0].price;

      displayPrice = currencyFormatter.format(endPrice)
      displayReturn = ((endPrice - beginningPrice) / beginningPrice * 100).toFixed(2)

    } else {
      displayPrice = '$0.00'
      displayReturn = 0
    }


    return (
      <div id="stock-show-page">
        <LoggedInNavBarContainer ticker={ticker} />
        <div id="stock-show-main">
          <div id="stock-show-left">
            <div id="stock-show-graph-div" className='bottom-border'>
              <div id="stock-show-graph-info">{(ticker)? searchFunction(ticker)[0][ticker] : null}</div>
              <div id="stock-show-graph-price">{displayPrice}</div>
              <div id="stock-show-graph-return">
                <div id="stock-show-graph-return-money" className='bold-font'>{currencyFormatter.format(displayReturn * beginningPrice / 100)}</div>
                <div id="stock-show-graph-return-percent" className='bold-font'>({displayReturn}%)</div>
                <div className='light-font'>Today</div>
              </div>
              <GraphContainer ticker={ticker}/>
            </div>


            <div className="stock-show-user-info" id="stock-show-user-info">
              <StockShowUserInfoContainer ticker={ticker}/>
            </div>


            <div id="stock-show-upcoming-activity">
              Upcoming Activity
            </div>
            <div id="stock-show-about">

            </div>

            <div id="stock-show-news">

            </div>

          </div>

          <div id="stock-show-right">
            <StockShowBarCotainer ticker={ticker}/>

          </div>
        </div>


      </div>
    )
  }

}

export default StockShow

