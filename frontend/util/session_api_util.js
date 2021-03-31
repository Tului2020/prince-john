export const signup = (user) => (
  $.ajax({
    method: 'POST',
    url: '/api/users',
    data: { user }
  })
)

export const signin = (user) => (
  $.ajax({
    method: 'POST',
    url: '/api/session',
    data: { user }
  })
)

export const signout = () => (
  $.ajax({
    method: 'DELETE',
    url: '/api/session',
  })
)


export const fetchUserInfo = (userId) => (
  $.ajax({
    method: 'GET',
    url: `/api/users/${userId}`,
  })
)


export const fetchUserStockInfo = (userId) => (
  $.ajax({
    method: 'GET',
    url: `/api/users/${userId}/stocks`,
  })
)

export const updateUserStockInfo = (userId, ticker, amount, unit_price) => (
  $.ajax({
    method: 'POST',
    url: `/api/users/${userId}/stocks`,
    data: {
      stock: {
        ticker,
        amount,
        unit_price
      }
    }
  })
)

export const addBalance = (userId, depositAmount) => (
  $.ajax({
    method: 'PATCH',
    url: `/api/users/${userId}`,
    data: {
      user: {
        deposit_amount: depositAmount
      }
    }
  })
)

export const getIntraDayFromDB = (ticker) => (
  $.ajax({
    method: 'GET',
    url: `/api/histories/${ticker}`,
  })
)

export const createIntraDayDB = (ticker, date, history) => (
  $.ajax({
    method: 'POST',
    url: `/api/histories/`,
    data: {
      history: {
        ticker,
        history,
        date
      }
    }
  })
)


export const updateIntraDayDB = (ticker, date, history) => (
  $.ajax({
    method: 'PATCH',
    url: `/api/histories/${ticker}`,
    data: {
      history: {
        history,
        date
      }
    }
  })
)



