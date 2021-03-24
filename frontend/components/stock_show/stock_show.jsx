import React from 'react';
import GraphContainer from '../graph/grapher';
import LoggedInNavBarContainer from '../nav_bar/logged_in/nav_bar_logged_in_container';
import StockShowBarCotainer from './components/stock_show_bar';
import StockShowUserInfoContainer from './components/stock_show_user_info';



class StockShow extends React.Component {
  render() {
    return (
      <div id="stock-show-page">
        <LoggedInNavBarContainer ticker={this.props.ticker} />
        <div id="stock-show-main">
          <div id="stock-show-left">
            <div id="stock-show-graph-div" className='bottom-border'>
              <GraphContainer ticker={this.props.ticker}/>
            </div>


            <div className="stock-show-user-info" id="stock-show-user-info">
              <StockShowUserInfoContainer ticker={this.props.ticker}/>
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
            <StockShowBarCotainer ticker={this.props.ticker}/>

          </div>
        </div>


      </div>
    )
  }

}

export default StockShow

