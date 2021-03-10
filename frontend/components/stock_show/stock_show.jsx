import React from 'react';
import { connect } from 'react-redux';


class StockShow extends React.Component {

    render() {
        return (
            <div>This is the stock show page</div>
        )
    }

}

const mSTP = (state) => ({
    currentUser: state.entities.users[state.session.currentUserId]
  })
  
  const mDTP = (dispatch) => ({
    signout: () => dispatch(signout())
  })
  
const StockShowContainer = connect(mSTP, mDTP)(StockShow);

export default StockShowContainer

