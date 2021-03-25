import StockShow from './stock_show';
import { connect } from 'react-redux';
import { fetchUserStockInfo } from '../../actions/stock_actions';


const mSTP = ({entities, session}, ownParams) => ({
    ticker: ownParams.match.params.ticker,
    current_stocks: entities.stocks.current_stocks,
    currentUser: entities.users[session.currentUserId],
    history: entities.history
})

const mDTP = (dispatch) => ({
    fetchUserStockInfo: (userId) => dispatch(fetchUserStockInfo(userId))
})

const StockShowContainer = connect(mSTP, mDTP)(StockShow);

export default StockShowContainer
