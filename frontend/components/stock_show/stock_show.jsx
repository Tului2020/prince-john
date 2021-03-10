import React from 'react';
import { connect } from 'react-redux';
import { fetchUserStockInfo } from '../../actions/stock_actions';
import LoggedInNavBarContainer from '../nav_bar/logged_in/nav_bar_logged_in_container';





class StockShow extends React.Component {
    componentDidMount() {
        this.userId = this.props.currentUser.id
        this.props.fetchUserStockInfo(this.userId);
      }



    render() {
        // debugger
        return (
            <div id="stock-show-page">


                <LoggedInNavBarContainer />


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
                        <div id="stock-show-market-bar">
                            <div id="stock-show-market-bar-trade" className="bottom-border">
                                <div>
                                    Buy {this.props.ticker}
                                </div>

                                <div>
                                    Sell {this.props.ticker}
                                </div>
                                <div>

                                </div>
                            </div>


                            <div id="stock-show-market-bar-order" className="bottom-border">

                                <div id="stock-show-market-bar-order-top" className="bottom-border">
                                    <div id="stock-show-invest-in">
                                        <div>Invest In</div>
                                        <div></div>
                                    </div>
                                    <div id="stock-show-shares">
                                        <div>Shares</div>
                                        <div></div>
                                    </div>

                                    <div id="stock-show-market-price">
                                        <div>Market Price</div>
                                        <div></div>
                                    </div>
                                </div>

                                <div id="stock-show-market-bar-order-bottom">

                                </div>

                            </div>




                            <div id="stock-show-market-bar-buy-power">
                                
                            </div>
                        </div>

                    </div>
                </div>


            </div>
        )
    }

}

const mSTP = (state, ownParams) => ({
    ticker: ownParams.match.params.ticker,
    current_stocks: state.entities.stocks,
    currentUser: state.entities.users[state.session.currentUserId],
})

const mDTP = (dispatch) => ({
    fetchUserStockInfo: (userId) => dispatch(fetchUserStockInfo(userId))
})

const StockShowContainer = connect(mSTP, mDTP)(StockShow);

export default StockShowContainer

