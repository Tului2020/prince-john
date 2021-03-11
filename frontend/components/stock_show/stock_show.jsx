import React from 'react';
import LoggedInNavBarContainer from '../nav_bar/logged_in/nav_bar_logged_in_container';
import StockShowBarCotainer from './components/stock_show_bar';








class StockShow extends React.Component {





  render() {

    // debugger



    return (
      <div id="stock-show-page">


        <LoggedInNavBarContainer ticker={this.props.ticker} />


        <div id="stock-show-main">
          <div id="stock-show-left">
            <div id="stock-show-graph">
              Stock Graph
            </div>


            <div id="stock-show-user-info">
              User Info
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
            <StockShowBarCotainer/>

          </div>
        </div>


      </div>
    )
  }

}

export default StockShow

