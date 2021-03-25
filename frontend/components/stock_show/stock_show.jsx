import React from 'react';
import GraphContainer from '../graph/grapher';
import searchFunction from '../nav_bar/logged_in/components/searchbar_components/search_function';
import LoggedInNavBarContainer from '../nav_bar/logged_in/nav_bar_logged_in_container';
import StockShowBarCotainer from './components/stock_show_bar';
import StockShowUserInfoContainer from './components/stock_show_user_info';



class StockShow extends React.Component {
  render() {
    let { ticker } = this.props
    // debugger
    return (
      <div id="stock-show-page">
        <LoggedInNavBarContainer ticker={ticker} />
        <div id="stock-show-main">
          <div id="stock-show-left">
            <div id="stock-show-graph-div" className='bottom-border'>
              <div id="stock-show-graph-info">{(ticker)? searchFunction(ticker)[0][ticker] : null}</div>
              <div id="stock-show-graph-price">$100.00</div>
              <div id="stock-show-graph-return">$100.00</div>
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

