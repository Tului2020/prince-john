import { PORTFOLIO_VALUE } from "../actions/portfolio_actions";




const portfolioValueReducer = (state=0, action) => {
  Object.freeze(state);

  switch (action.type) {
    case PORTFOLIO_VALUE :
      return action.portfolioValue
    default:
      return state
  }
}

export default portfolioValueReducer;
