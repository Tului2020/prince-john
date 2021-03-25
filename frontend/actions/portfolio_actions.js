export const PORTFOLIO_VALUE = 'PORTFOLIO_VALUE';

const getPortfolioValue = (portfolioValue) => ({
  type: PORTFOLIO_VALUE,
  portfolioValue
})

export const updatePortfolioValue = (portfolioValue) => dispatch => {
  console.log('updating portfolioValue')
  dispatch(getPortfolioValue(portfolioValue))
}






