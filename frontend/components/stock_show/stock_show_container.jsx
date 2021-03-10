import StockShow from './stock_show';
import { connect } from 'react-redux';
import { fetchUserStockInfo } from '../../actions/stock_actions';


const mSTP = (state, ownParams) => ({
    ticker: ownParams.match.params.ticker,
    current_stocks: state.entities.stocks.current_stocks,
    currentUser: state.entities.users[state.session.currentUserId],
})

const mDTP = (dispatch) => ({
    fetchUserStockInfo: (userId) => dispatch(fetchUserStockInfo(userId))
})

const StockShowContainer = connect(mSTP, mDTP)(StockShow);

export default StockShowContainer
