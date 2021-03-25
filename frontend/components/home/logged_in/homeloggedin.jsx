import React from 'react';
import LoggedInNavBarContainer from '../../nav_bar/logged_in/nav_bar_logged_in_container'
import { connect } from 'react-redux';
import StockBar from '../../stock_bar/stock_bar';
import { fetchUserStockInfo } from '../../../actions/stock_actions';
import GraphContainer from '../../graph/grapher';


const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})


class HomeLoggedIn extends React.Component {
  componentDidMount() {
    this.userId = this.props.currentUser.id
    this.props.fetchUserStockInfo(this.userId);
  }

  getPortfilioStatus() {
    let { history, current_stocks } = this.props
    let currentStocksLength = Object.keys(current_stocks).length
    let portfolioValueEnding = 0;
    let portfolioValueBeginning = 0;
    let portfolioReturnPercent = 0;
    let portfolioReturnMoney = currencyFormatter.format(0);

    if (currentStocksLength > 0 && currentStocksLength <= Object.keys(history).length) {
      Object.keys(current_stocks).forEach(ticker => {
        portfolioValueEnding += history[ticker][108].price * current_stocks[ticker]
        portfolioValueBeginning += history[ticker][0].price * current_stocks[ticker]
      })
      portfolioValueBeginning += parseFloat(this.props.currentUser.balance)
      portfolioValueEnding += parseFloat(this.props.currentUser.balance)
      portfolioReturnPercent = 100 * (portfolioValueEnding - portfolioValueBeginning) / portfolioValueBeginning
      portfolioReturnMoney = currencyFormatter.format(portfolioReturnPercent * portfolioValueBeginning / 100)
    }

    portfolioValueEnding = currencyFormatter.format(portfolioValueEnding)

    return {portfolioValueEnding, portfolioReturnPercent, portfolioReturnMoney};
  }



  render() {
    let {portfolioValueEnding, portfolioReturnPercent, portfolioReturnMoney} = this.getPortfilioStatus();
    let balance  = parseFloat(this.props.currentUser.balance)
    // debugger

    return (
      <div id="logged-in-home">
        <LoggedInNavBarContainer />
        <div id="logged-in-bottom">
          <div id="logged-in-left">
            <div id="home-stock-show-graph-div" className='bottom-border'>
              <div id="stock-show-graph-price">{portfolioValueEnding}</div>
              <div id="stock-show-graph-return">
                <div id="stock-show-graph-return-money" className='bold-font'>{portfolioReturnMoney}</div>
                <div id="stock-show-graph-return-percent" className='bold-font'>({portfolioReturnPercent.toFixed(2)}%)</div>
                <div className='light-font'>Today</div>
              </div>
              <GraphContainer ticker={'homePage'} />
            </div>
            <div id='buying-power' className='bottom-border'>
              <div>Buying Power</div>
              <div>{currencyFormatter.format(balance)}</div>
            </div>



          </div>

          <div id="logged-in-right">
            <StockBar />
          </div>

        </div>
      </div>
    )
  }
}

const mSTP = ({entities, session}) => ({
  currentUser: entities.users[session.currentUserId],
  current_stocks: entities.stocks.current_stocks,
  history: entities.history,
})


const mDTP = (dispatch) => ({
  fetchUserStockInfo: (userId) => dispatch(fetchUserStockInfo(userId))
})

export default connect(mSTP, mDTP)(HomeLoggedIn);
