import React from 'react';
import { connect } from 'react-redux';
import LoggedInNavBarContainer from '../nav_bar/logged_in/nav_bar_logged_in_container';




class StockShow extends React.Component {

    render() {

        return (
            <div>
                <LoggedInNavBarContainer />
                <div>This is the stock show page for {this.props.ticker}</div>
            </div>
        )
    }

}

const mSTP = (state, ownParams) => ({
    ticker: ownParams.match.params.ticker
  })
  
  const mDTP = (dispatch) => ({

  })
  
const StockShowContainer = connect(mSTP, mDTP)(StockShow);

export default StockShowContainer

