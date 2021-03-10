import React from 'react';

import LoggedInNavBarContainer from '../nav_bar/logged_in/nav_bar_logged_in_container';





class StockShow extends React.Component {
    componentWillMount() {
        this.userId = this.props.currentUser.id
        this.props.fetchUserStockInfo(this.userId);

      }



    render() {
        let stockAmount;

        if (this.props.current_stocks) {
            let pageTicker = this.props.ticker
            // debugger
            this.props.current_stocks.forEach(({name, amount}) => {
                // debugger
                if (name === pageTicker) {
                    stockAmount = amount
                }
            })
            // debugger
        }
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
                                    {/* {stockAmount} */}
                                </div>

                            </div>




                            <div id="stock-show-market-bar-buy-power">
                                {stockAmount}
                            </div>
                        </div>

                    </div>
                </div>


            </div>
        )
    }

}

export default StockShow

